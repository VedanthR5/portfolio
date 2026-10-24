# Writing and maintaining the blog

The blog lives at `/blog`; articles live at `/blog/:slug`. It uses the existing React, React Router, and Motion stack. A dark frame and purple links connect it to the portfolio. Source Serif 4 carries headlines and reading text; Poppins remains the interface face. Each story has its own editorial cover and a restrained accent color.

## Architecture

- `src/blog/catalog.js` contains lightweight article metadata, derives topic filters, and provides search, sort, and date formatting. Each entry dynamically imports its article body.
- `src/blog/posts/` contains article data. Paragraphs are plain strings with optional citation markup; no HTML or Markdown execution is involved.
- `Blog.jsx` renders the index. Search, topic, and sort state use the URL parameters `q`, `topic`, and `sort`, so filtered views can be bookmarked.
- `Post.jsx` loads the selected article and renders headings, contents navigation, reading progress, focus mode, and sources.
- `Citation.jsx` renders ordinary external links and optional previews using local editorial metadata. It never fetches or embeds the source website.
- `Shared.jsx` and `blog.css` contain shared motion, artwork, and styling. `usePageMeta.js` updates browser metadata; `scripts/build-blog.mjs` emits static social/canonical metadata and sitemap entries.

The home, index, and article routes are lazy-loaded independently. Keep Three.js and other home-only imports out of the blog and shared navigation so an article visit does not load the portfolio's canvas code.

## Add an article

1. Create a module such as `src/blog/posts/example.js` that exports an article object as its default export.
2. Add an entry to `posts` in `catalog.js` with a unique lowercase hyphenated `slug`, `title`, `subtitle`, `description`, ISO `date` (`YYYY-MM-DD`), `tags`, and `load: () => import("./posts/example.js")`. `status` is optional: omit it for a finished essay without a badge.
   Include `cover: { src, alt, width, height, accent }`. Store a WebP at the local `/blog/` path, describe its subject in `alt`, and use its intrinsic dimensions. Supported accents are `coral` and `gold`. Add new accents to the scoped CSS and content validation together. Record cover provenance in `public/blog/README.md`.
3. Include `lede`, `sources`, and `sections` in the article object; `note` is optional. Each section needs a unique lowercase hyphenated `id`, a `title`, and a `paragraphs` array. Reserve the IDs `sources` and `content` for the page itself.
4. Add citations next to the claims they support. Run the content tests and build, then check the article on desktop and mobile.

Tags automatically become filter choices. Search covers metadata and tags, keeping article bodies out of the initial index payload. Supported sort values are `newest`, `oldest`, and `title`.

**`Working draft` is a visible editorial label, not a publication gate.** Any article registered in the catalog is publicly accessible after deployment. Keep unpublished material out of the catalog and repository if it must remain private.

Example article structure:

```js
export default {
  note: "An opening draft, with sources attached.",
  lede: "The question this essay explores.",
  sources: {
    evidence: {
      title: "Source title",
      publisher: "Publisher",
      date: "2026-09-20",
      kind: "Primary source",
      url: "https://example.org/document",
      summary: "A short editorial summary of the relevant evidence.",
    },
  },
  sections: [{
    id: "the-question",
    title: "01 / The question",
    paragraphs: ["An argument grounded in [[evidence|the original document]]."],
  }],
};
```

Citation markup is `[[sourceKey|visible label]]`, supported in both the lede and paragraphs. The key must exist in the same article's `sources` map. Use HTTPS URLs and concise summaries written in your own words. Identify reporting, opinion, and primary sources through `kind`; mention subscription requirements when appropriate. Preview summaries are not live extracts or substitutes for reading the source.

Source dates are optional when the publication date is unknown. Omit the date rather than guessing; known dates use `YYYY-MM-DD`. Article publication dates remain required.

A section can include `quote`, `quoteSource`, and `quoteAttribution` (for example, `Speaker · event`). Verify quotations against the cited document. The sources heading is numbered automatically after the article sections.

For a continuous essay, set `layout: "essay"` on the article. Section headings remain available to assistive technology and the contents navigation, but do not interrupt the visible prose. This layout uses a comfortable body size and a larger pullout quote, retaining the site's existing typeface and palette. Put a quote at the end of the section where it belongs in the reading flow.

## Interaction and accessibility checks

Hovering or focusing a citation link opens its preview. The original link still opens the source in a new tab. Use ArrowDown or activate the adjacent preview button to enter the preview with the keyboard; Escape closes it and returns focus. The explicit button also makes previews available on touchscreens. Verify that the pointer can move from the citation into the card without dismissing it.

Sections have stable fragment links and fixed-navbar offsets. Contents navigation becomes a disclosure on narrow screens. Focus mode hides the article cover. Readers who request reduced motion receive no animated scrolling, cover zoom, or reveal motion. Print styles remove navigation and artwork and expose source URLs.

The first result is featured; remaining results become compact archive rows. Filtering and sorting change that ordering without changing each story's cover or accent. The first cover loads eagerly; other covers load lazily. Covers declare dimensions, use object-fit cropping, and never contain the article title. The self-hosted Source Serif 4 assets and license live under `public/fonts/source-serif-4/`. Font declarations are shared by the home and blog stylesheets through `src/editorial.css`; neither route imports the other's component styles.

Article text remains visible throughout scrolling; reveals apply only to the header and artwork. Preview focus changes must use `preventScroll`, and toggling focus mode preserves the reading position. Canonical URLs, social page types, and Blog navigation matching share `pageMeta.js`; test both slash and non-slash routes.

Useful manual checks: direct article refresh, an unknown slug, filtered index reload, browser Back, keyboard preview entry and dismissal, mobile overflow, reduced motion, and print preview. Local content tests validate structure and reference integrity; they do not verify source accuracy or remote link availability.

## Hosting and verification

`public/_redirects` provides Netlify's SPA fallback (`/* /index.html 200`) for paths without a generated static file. Deploy the complete build output; existing static files take precedence over this fallback. Other hosts need an equivalent fallback so refreshing `/blog/:slug` works.

Run the focused content suite with:

```sh
node --test tests/blog.test.mjs
```

Also run the project build and lint commands before opening a PR. These checks cover application integration; browser validation remains necessary for motion, keyboard focus, and responsive layout.
