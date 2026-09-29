# CLAUDE.md

Project-specific guidance for this repo. It supplements (does not replace) the global rules in `~/.claude/CLAUDE.md`.

## What this is

Personal portfolio + blog for Vedanth Ramanathan, live at https://vedanthramanathan.com. A client-only React 19 SPA built with Vite 8 (Rolldown/Oxc), Tailwind 4 (`@tailwindcss/vite`; the JS `tailwind.config.js` is loaded through `@config` in `src/index.css`), React Router 7 (`react-router-dom`) and Motion. Deployed as static files from `dist/` (Netlify).

## Commands

```sh
npm ci                 # install
npm run dev            # Vite dev server on :5173
npm run lint           # ESLint over src/ (max 50 warnings)
npm run test:blog      # node --test tests/blog.test.mjs — blog content/metadata validation
npm run build          # vite build, then scripts/build-blog.mjs (post-build step, needs dist/)
npm test               # test:blog + build
npm run preview        # serve the built dist/
```

CI (`.github/workflows/ci-cd.yml`, Node 20) runs: `npm ci` → `lint` → `test:blog` → `build`. Run all three locally before opening a PR.

## Architecture

- `src/main.jsx` → `src/App.jsx`: `BrowserRouter` with three lazy routes, declared in `src/routes.js` with `preload` functions; links call them on hover, focus, or touch (`preloadOn`). `/` is `components/Home`, `/blog` is `blog/Blog`, `/blog/:slug` is `blog/Post`. `Navbar` is shared and always loaded.
- **Home (portfolio)**: `components/Home.jsx` composes `Hero`, `About` (bio, a dated "Now" list, recognition), `Experience`, `Works` (projects) and `Contact`. Sections are wrapped with the `SectionWrapper` HOC (`src/hoc/`), which sets the anchor `id` used by nav links (`#about`, etc.) and never hides content until it scrolls into view. Experience and projects share `components/WorkList.jsx`: rows open in place, several can be open at once, and the open row is mirrored in the URL hash (`/#bustub`) so it can be linked. Home-only CSS lives in `src/home.css`; row diagrams are inline SVG in `components/Diagram.jsx`.
- **Portfolio content** (nav links, profile links, the "Now" list, honors, experiences, projects) lives in `src/constants/index.js`. Edit it there, not in the components. Each entry has a one-line `line`, optional `metrics` (verified numbers shown on the closed row; don't repeat them in `line`), either a `story` (`problem` / `decision` / `result`) or `detail` paragraphs for the opened row, and `links` labeled by what they open (Paper, Code, Demo, Coverage…). Each honor or accomplishment should appear in one place only (About, Recognition, or a row). Figures for `diagram` kinds (`fuzz`, `db`, `flow`) are in `components/Diagram.jsx`: words stay in HTML so they read on phones, and they build in once when a row opens (none under reduced motion). Entry `id`s double as URL hashes, so keep them stable and distinct from section ids. Images are re-exported from `src/assets/index.js`; project screenshots live in `src/assets/work/`.
- **Shared style strings** are in `src/styles.js`. Theme colors, fonts, and the `xs` breakpoint are in `tailwind.config.js`. Global CSS is in `src/index.css`, and blog-only CSS is in `src/blog/blog.css`.
- **Blog**: `docs/blog.md` is the authoritative authoring guide. Read it before touching blog code or adding a post. Key points:
  - `src/blog/catalog.js` holds lightweight post metadata plus `selectPosts` / `formatDate`. Each post's body is dynamically imported from `src/blog/posts/<name>.js`.
  - Article bodies are plain JS objects (`note`, `lede`, `sources`, `sections`). Citations use `[[sourceKey|label]]` inside paragraph strings. Nothing is rendered as raw HTML or Markdown.
  - `src/blog/pageMeta.js` (`getRouteMeta`) is the single source for canonical URLs, `og:type`, and "is this a blog route". It is used by `usePageMeta`, `Navbar`, and `scripts/build-blog.mjs`, so they must agree.
  - `scripts/build-blog.mjs` runs after `vite build`. It writes `dist/blog/index.html` and `dist/blog/<slug>/index.html` with per-route meta and JSON-LD, and appends blog URLs to `dist/sitemap.xml`.
  - `tests/blog.test.mjs` enforces slug format, required fields, ISO dates, unique section IDs (`sources` and `content` are reserved), citation keys existing in `sources`, and HTTPS source URLs.
  - Any post in the catalog is public, including ones with status "Working draft".

## Conventions and gotchas

- **Keep the blog routes free of home-only imports.** The routes are split so that article visits don't download home code. (The home route no longer uses Three.js; don't reintroduce a WebGL canvas without pausing it offscreen and honoring reduced motion.)
- **Animation imports come from `motion/react`**, not `framer-motion`, which is not a direct dependency. Animating `height: "auto"` makes Motion restore the scroll position after measuring, which cancels an in-progress anchor jump. That is why a deep-linked row renders already open (no height animation) and `Home` scrolls to it instantly on a fresh load only; Back/Forward is left to the browser's scroll restoration.
- **Navigation**: section links (navbar, every route) are router `Link`s to `{ pathname: "/", hash }`, never plain `/#id` anchors, which would reload the document and show the Suspense fallback. There is no global smooth scrolling: `Home` jumps to the hash and briefly marks the section (`is-arrived`). `RoutePosition` scrolls to the top only on PUSH/REPLACE; Back/Forward belong to the browser and to `Home`'s saved reading position. The Suspense fallback and the article loader stay blank unless loading takes longer than 900 ms.
- **Console output is stripped in builds** (Oxc `dropConsole`/`dropDebugger` under `build.rolldownOptions.output.minify` in `vite.config.js`). Don't rely on `console.*` for production diagnostics.
- **ESLint 10** uses the flat config in `eslint.config.js`. `eslint-plugin-react` 7.37.5 still declares a peer range of ESLint ≤9, so `package.json` has an `overrides` entry that lets it resolve against ESLint 10, and `settings.react.version` is pinned (its `"detect"` mode calls an API ESLint 10 removed). Keep that version in step with React, and drop both workarounds once the plugin supports ESLint 10. `react/prop-types` is on, so blog components declare `propTypes`, even though React 19 no longer checks them at runtime. The React Compiler rules `react-hooks/refs` and `react-hooks/set-state-in-effect` are downgraded to warnings for existing effects in `Post` and `Hero`.
- **Node/npm**: Node 24 is pinned in `.nvmrc`, and CI reads its version from that file. npm 12 blocks dependency install scripts unless they are listed under `allowScripts` in `package.json`. Only `fsevents` (via Vite) needs one. Entries are pinned to exact versions, so a version bump requires `npm install-scripts approve <pkg>` again.
- **CSP** is a `<meta http-equiv>` in `index.html`. New third-party origins (scripts, fetch targets, fonts) must be added there or they will be blocked. Google Analytics (`gtag`) is loaded in `index.html`, and helpers are in `src/utils/analytics.js`.
- **Env vars** (Vite, client-side, in `.env.local`, gitignored): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (Contact form) and `VITE_RESUME_URL` (`src/utils/secureUrl.js`). They end up in the bundle, so never put real secrets in `VITE_*`. `security-check.sh` greps `dist/` for leaked resume URLs.
- **SPA fallback**: `public/_redirects` (`/* /index.html 200`). Generated static files under `dist/blog/` take precedence.
- Site origin `https://vedanthramanathan.com` is hardcoded in `pageMeta.js` and `build-blog.mjs`.
- `dist/` is build output and is gitignored. Don't commit it.
