import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { posts } from "../src/blog/catalog.js";

// Give static hosts and link-preview crawlers route-specific metadata without
// fetching article bodies or adding another rendering dependency.
const root = fileURLToPath(new URL("../", import.meta.url));
const dist = resolve(root, "dist");
const origin = "https://vedanthramanathan.com";
const template = await readFile(resolve(dist, "index.html"), "utf8");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function setMeta(html, attribute, name, value) {
  const tag = `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`;
  const pattern = new RegExp(`<meta\\b[^>]*\\b${attribute}\\s*=\\s*["']${escapeRegex(name)}["'][^>]*>`, "gi");
  let found = false;
  const result = html.replace(pattern, () => {
    if (found) return "";
    found = true;
    return tag;
  });
  return found ? result : result.replace(/<\/head>/i, () => `    ${tag}\n  </head>`);
}

async function writePage(pathname, title, description, post) {
  const url = `${origin}${pathname}`;
  const fullTitle = `${title} · Vedanth Ramanathan`;
  let html = template.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i,
    () => `<title>${escapeHtml(fullTitle)}</title>`);
  const canonical = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  html = html.replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, () => canonical);
  for (const [attribute, name, value] of [
    ["name", "title", fullTitle],
    ["name", "description", description],
    ["property", "og:title", fullTitle],
    ["property", "og:description", description],
    ["property", "og:url", url],
    ["property", "og:type", post ? "article" : "website"],
    ["name", "twitter:title", fullTitle],
    ["name", "twitter:description", description],
    ["name", "twitter:url", url],
  ]) html = setMeta(html, attribute, name, value);

  if (post) {
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      author: { "@id": `${origin}/#person` },
      isPartOf: { "@id": `${origin}/#website` },
      keywords: post.tags.join(", "),
      inLanguage: "en-US",
    }).replace(/</g, "\\u003c");
    // Add a separate graph node; retain the homepage's Person/WebSite graph.
    html = html.replace(/<\/head>/i,
      () => `    <script type="application/ld+json">${schema}</script>\n  </head>`);
  }
  const directory = resolve(dist, `.${pathname}`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}

const slugs = new Set();
for (const post of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || slugs.has(post.slug)) {
    throw new Error(`Invalid or duplicate blog slug: ${post.slug}`);
  }
  slugs.add(post.slug);
}

await writePage("/blog", "Writing", "Notes and essays on economics, technology, and the institutions shaping what comes next.");
for (const post of posts) await writePage(`/blog/${post.slug}`, post.title, post.description, post);

const sitemapPath = resolve(dist, "sitemap.xml");
let sitemap = await readFile(sitemapPath, "utf8");
// Replace generated blog entries on reruns while leaving existing home URLs,
// dates, and priorities untouched.
sitemap = sitemap.replace(/\s*<url\b[^>]*>[\s\S]*?<\/url>/g, (entry) => {
  const location = entry.match(/<loc>\s*([^<]+)\s*<\/loc>/)?.[1]?.trim();
  return location && (location === `${origin}/blog` || location.startsWith(`${origin}/blog/`)) ? "" : entry;
});
if (!/<\/urlset>/.test(sitemap)) throw new Error("Missing urlset in dist/sitemap.xml");
const entries = ["/blog", ...posts.map((post) => `/blog/${post.slug}`)]
  .map((pathname) => `  <url>\n    <loc>${escapeHtml(`${origin}${pathname}`)}</loc>\n  </url>`)
  .join("\n");
sitemap = sitemap.replace(/<\/urlset>/, () => `${entries}\n</urlset>`);
await writeFile(sitemapPath, sitemap);
console.log(`Generated static metadata for /blog and ${posts.length} article route(s).`);
