import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { posts, topics, selectPosts, formatDate } from "../src/blog/catalog.js";
import { getRouteMeta } from "../src/blog/pageMeta.js";
import { getShareLinks } from "../src/blog/shareLinks.js";

test("share destinations preserve titles and use the production article URL", () => {
  const post = { slug: "example", title: "AI & people: who decides?", description: "A question + an answer." };
  const { url, message, destinations } = getShareLinks(post);
  assert.equal(url, "https://vedanthramanathan.com/blog/example");
  assert.equal(message, `${post.title}\n${url}`);
  const links = Object.fromEntries(destinations.map((entry) => [entry.label, new URL(entry.href)]));
  assert.equal(links.LinkedIn.searchParams.get("url"), url);
  assert.equal(links["X / Twitter"].searchParams.get("text"), post.title);
  assert.equal(links["X / Twitter"].searchParams.get("url"), url);
  assert.equal(links.WhatsApp.searchParams.get("text"), message);
  assert.equal(links.Email.searchParams.get("subject"), post.title);
  assert.equal(links.Email.searchParams.get("body"), `${post.description}\n\n${url}`);
  assert.ok(!links.Email.href.includes("+"), "Mail clients need percent-encoded spaces");
});

test("canonical and social metadata agree for slash and non-slash routes", () => {
  for (const path of ["/blog", "/blog/", "/blog///"]) {
    assert.deepEqual(getRouteMeta(path), {
      path: "/blog", url: "https://vedanthramanathan.com/blog", isBlog: true, type: "website",
    });
  }
  for (const suffix of ["", "/", "///"]) {
    const route = getRouteMeta(`/blog/warsh-and-the-independent-fed${suffix}`);
    assert.equal(route.url, "https://vedanthramanathan.com/blog/warsh-and-the-independent-fed");
    assert.equal(route.type, "article");
    assert.equal(route.isBlog, true);
  }
  assert.equal(getRouteMeta("/").url, "https://vedanthramanathan.com/");
  for (const path of ["/", "/blogger", "/blogger/", "/blog-archive"]) {
    assert.equal(getRouteMeta(path).isBlog, false);
    assert.equal(getRouteMeta(path).type, "website");
  }
});

test("catalog search combines words, topics, and empty results", () => {
  assert.ok(posts.length, "Keep at least one article in the catalog");
  const first = posts[0];
  assert.ok(selectPosts({ query: `  ${first.title.toUpperCase()}  ` }).includes(first));
  assert.ok(selectPosts({ query: `${first.title} ${first.tags[0]}`, topic: first.tags[0] }).includes(first));
  assert.deepEqual(selectPosts({ query: "zz-no-article-has-this-phrase-zz" }), []);
  assert.deepEqual(selectPosts({ topic: "zz-unknown-topic-zz" }), []);
  assert.equal(selectPosts({ query: "   " }).length, posts.length);
  for (const topic of topics) {
    const results = selectPosts({ topic });
    assert.ok(results.length, `Topic ${topic} has articles`);
    assert.ok(results.every((post) => post.tags.includes(topic)));
  }
});

test("sort order does not mutate the catalog", () => {
  const originalOrder = posts.map((post) => post.slug);
  for (const sort of ["newest", "oldest", "title"]) {
    const results = selectPosts({ sort });
    for (let i = 1; i < results.length; i += 1) {
      const previous = results[i - 1];
      const current = results[i];
      if (sort === "title") assert.ok(previous.title.localeCompare(current.title) <= 0);
      else if (sort === "oldest") assert.ok(previous.date <= current.date);
      else assert.ok(previous.date >= current.date);
    }
  }
  assert.deepEqual(posts.map((post) => post.slug), originalOrder);
});

test("dates render consistently without local timezone shifts", () => {
  assert.equal(formatDate("2026-09-20"), "Sep 20, 2026");
});

test("every lazy article has valid metadata, sections, and source references", async () => {
  const slugs = new Set();
  for (const post of posts) {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!slugs.has(post.slug), `Duplicate slug: ${post.slug}`);
    slugs.add(post.slug);
    for (const field of ["title", "subtitle", "description"]) {
      assert.ok(typeof post[field] === "string" && post[field].trim(), `${post.slug}: missing ${field}`);
    }
    if (post.status !== undefined) assert.ok(typeof post.status === "string" && post.status.trim());
    assert.match(post.cover.src, /^\/blog\/[a-z0-9-]+\.webp$/);
    assert.ok(post.cover.alt.trim(), `${post.slug}: describe the cover`);
    assert.ok(post.cover.width > 0 && post.cover.height > 0, "Cover dimensions prevent layout shifts");
    assert.ok(["coral", "gold"].includes(post.cover.accent));
    const coverBytes = await readFile(new URL(`../public${post.cover.src}`, import.meta.url));
    assert.equal(coverBytes.toString("ascii", 0, 4), "RIFF", "Cover must be a served WebP asset");
    assert.equal(coverBytes.toString("ascii", 8, 12), "WEBP");
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(`${post.date}T00:00:00Z`).toISOString().slice(0, 10), post.date);
    assert.ok(post.tags.length && post.tags.every((tag) => typeof tag === "string" && tag.trim()));
    assert.equal(new Set(post.tags).size, post.tags.length, "No duplicate tags");
    assert.equal(typeof post.load, "function");
    const { default: article } = await post.load();
    assert.ok(article.lede && article.sections.length);
    if (article.note !== undefined) assert.ok(typeof article.note === "string" && article.note.trim());
    if (article.layout !== undefined) assert.equal(article.layout, "essay");
    const ids = new Set(["sources", "content"]);
    const references = new Set();
    const validateCitations = (text) => {
      assert.equal(typeof text, "string");
      const citation = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
      for (const match of text.matchAll(citation)) {
        assert.ok(article.sources[match[1]], `Missing citation: ${match[1]}`);
        assert.ok(match[2].trim(), "Citation labels must not be empty");
        references.add(match[1]);
      }
      assert.ok(!text.replace(citation, "").includes("[["), "Malformed citation");
    };
    validateCitations(article.lede);
    for (const section of article.sections) {
      assert.match(section.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(!ids.has(section.id), `Duplicate or reserved section ID: ${section.id}`);
      ids.add(section.id);
      assert.ok(section.title && section.paragraphs.length);
      for (const paragraph of section.paragraphs) {
        validateCitations(paragraph);
      }
      if (section.quote) {
        assert.ok(article.sources[section.quoteSource], `Missing quote source: ${section.quoteSource}`);
        references.add(section.quoteSource);
      }
    }
    assert.ok(references.size, "Each essay should cite its evidence");
    for (const [id, source] of Object.entries(article.sources)) {
      for (const field of ["title", "publisher", "kind", "summary"]) {
        assert.ok(typeof source[field] === "string" && source[field].trim(), `${id}: missing ${field}`);
      }
      assert.equal(new URL(source.url).protocol, "https:", `${id}: sources must use HTTPS`);
      if (source.date !== undefined) {
        assert.match(source.date, /^\d{4}-\d{2}-\d{2}$/);
        assert.equal(new Date(`${source.date}T00:00:00Z`).toISOString().slice(0, 10), source.date);
      }
    }
  }
});
