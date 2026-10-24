import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { posts } from "../src/blog/catalog.js";
import { getSocialMeta } from "../src/blog/socialMeta.js";
import { escapeHtml } from "../scripts/static-blog.js";

test("built articles expose unique cards and readable content without JavaScript", async () => {
  const images = new Set();
  for (const post of posts) {
    const html = await readFile(new URL(`../dist/blog/${post.slug}/index.html`, import.meta.url), "utf8");
    const social = getSocialMeta(`/blog/${post.slug}/`);
    assert.ok(!images.has(social.image), "Each essay gets its own thumbnail");
    images.add(social.image);
    for (const [key, value] of Object.entries({
      "og:image": social.image, "og:image:width": "1200", "og:image:height": "675",
      "og:description": post.description, "og:url": `https://vedanthramanathan.com/blog/${post.slug}`,
    })) {
      assert.equal(html.match(new RegExp(`property="${key}"`, "g"))?.length, 1);
      assert.ok(html.includes(`property="${key}" content="${escapeHtml(value)}"`));
    }
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    const bytes = await readFile(new URL(`../dist${new URL(social.image).pathname}`, import.meta.url));
    assert.equal(bytes.readUInt16BE(0), 0xffd8, "Card image must be a real JPEG");
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const schema = schemas.find((entry) => entry["@type"] === "BlogPosting");
    assert.equal(schema.image.url, social.image);
    assert.equal(schema.author.name, "Vedanth Ramanathan");
    assert.equal(schema.datePublished, post.date);
    const { default: article } = await post.load();
    assert.ok(html.includes(`<h1>${escapeHtml(post.title)}</h1>`));
    assert.ok(html.includes(escapeHtml(article.sections.at(-1).paragraphs.at(-1)).split("[[")[0]));
    assert.ok(!html.includes("[["), "Citations are normal crawlable links");
    assert.ok(html.includes('id="sources"'));
  }
});

test("built blog index links directly to every article", async () => {
  const html = await readFile(new URL("../dist/blog/index.html", import.meta.url), "utf8");
  for (const post of posts) assert.ok(html.includes(`href="/blog/${post.slug}"`));
});
