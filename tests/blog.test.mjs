import test from "node:test";
import assert from "node:assert/strict";
import { posts, topics, selectPosts, formatDate } from "../src/blog/catalog.js";

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
    for (const field of ["title", "subtitle", "description", "status"]) {
      assert.ok(typeof post[field] === "string" && post[field].trim(), `${post.slug}: missing ${field}`);
    }
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(`${post.date}T00:00:00Z`).toISOString().slice(0, 10), post.date);
    assert.ok(post.tags.length && post.tags.every((tag) => typeof tag === "string" && tag.trim()));
    assert.equal(new Set(post.tags).size, post.tags.length, "No duplicate tags");
    assert.equal(typeof post.load, "function");
    const { default: article } = await post.load();
    assert.ok(article.lede && article.note && article.sections.length);
    const ids = new Set(["sources", "content"]);
    const references = new Set();
    for (const section of article.sections) {
      assert.match(section.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(!ids.has(section.id), `Duplicate or reserved section ID: ${section.id}`);
      ids.add(section.id);
      assert.ok(section.title && section.paragraphs.length);
      for (const paragraph of section.paragraphs) {
        assert.equal(typeof paragraph, "string");
        const citation = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
        for (const match of paragraph.matchAll(citation)) {
          assert.ok(article.sources[match[1]], `Missing citation: ${match[1]}`);
          assert.ok(match[2].trim(), "Citation labels must not be empty");
          references.add(match[1]);
        }
        assert.ok(!paragraph.replace(citation, "").includes("[["), `Malformed citation in ${section.id}`);
      }
      if (section.quote) {
        assert.ok(article.sources[section.quoteSource], `Missing quote source: ${section.quoteSource}`);
        references.add(section.quoteSource);
      }
    }
    assert.ok(references.size, "Each essay should cite its evidence");
    for (const [id, source] of Object.entries(article.sources)) {
      for (const field of ["title", "publisher", "date", "kind", "summary"]) {
        assert.ok(typeof source[field] === "string" && source[field].trim(), `${id}: missing ${field}`);
      }
      assert.equal(new URL(source.url).protocol, "https:", `${id}: sources must use HTTPS`);
      assert.match(source.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(`${source.date}T00:00:00Z`).toISOString().slice(0, 10), source.date);
    }
  }
});
