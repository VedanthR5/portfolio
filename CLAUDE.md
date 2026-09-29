# CLAUDE.md

Project-specific guidance for this repo. It supplements (does not replace) the global rules in `~/.claude/CLAUDE.md`.

## What this is

Personal portfolio + blog for Vedanth Ramanathan, live at https://vedanthramanathan.com. A client-only React 18 SPA built with Vite 6, Tailwind 3, React Router 6, Three.js (`@react-three/fiber`/`drei`) and Motion. Deployed as static files from `dist/` (Netlify).

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

- `src/main.jsx` → `src/App.jsx`: `BrowserRouter` with three lazy routes. `/` is `components/Home`, `/blog` is `blog/Blog`, `/blog/:slug` is `blog/Post`. `Navbar` is shared and always loaded.
- **Home (portfolio)**: `components/Home.jsx` composes `Hero`, `About`, `Experience`, `CurrentWork`, `Works`, `Contact`, and `canvas/Stars` (Three.js). Sections are wrapped with the `SectionWrapper` HOC (`src/hoc/`), which also sets the anchor `id` used by nav links (`#about`, etc.).
- **Portfolio content** (nav links, services, experiences, projects) lives in `src/constants/index.js`. Edit it there, not in the components. Images are re-exported from `src/assets/index.js`.
- **Shared style strings** are in `src/styles.js`. Theme colors, fonts, and the `xs` breakpoint are in `tailwind.config.js`. Global CSS is in `src/index.css`, and blog-only CSS is in `src/blog/blog.css`.
- **Blog**: `docs/blog.md` is the authoritative authoring guide. Read it before touching blog code or adding a post. Key points:
  - `src/blog/catalog.js` holds lightweight post metadata plus `selectPosts` / `formatDate`. Each post's body is dynamically imported from `src/blog/posts/<name>.js`.
  - Article bodies are plain JS objects (`note`, `lede`, `sources`, `sections`). Citations use `[[sourceKey|label]]` inside paragraph strings. Nothing is rendered as raw HTML or Markdown.
  - `src/blog/pageMeta.js` (`getRouteMeta`) is the single source for canonical URLs, `og:type`, and "is this a blog route". It is used by `usePageMeta`, `Navbar`, and `scripts/build-blog.mjs`, so they must agree.
  - `scripts/build-blog.mjs` runs after `vite build`. It writes `dist/blog/index.html` and `dist/blog/<slug>/index.html` with per-route meta and JSON-LD, and appends blog URLs to `dist/sitemap.xml`.
  - `tests/blog.test.mjs` enforces slug format, required fields, ISO dates, unique section IDs (`sources` and `content` are reserved), citation keys existing in `sources`, and HTTPS source URLs.
  - Any post in the catalog is public, including ones with status "Working draft".

## Conventions and gotchas

- **Keep the blog routes free of Three.js and other home-only imports.** The routes are split so that article visits don't download the canvas code.
- **Animation imports come from `motion/react`**, not `framer-motion`, which is not a direct dependency.
- **Console output is stripped in builds** (`esbuild.drop: ["console", "debugger"]` in `vite.config.js`). Don't rely on `console.*` for production diagnostics.
- **ESLint** (v8, legacy config) is configured only in `.eslintrc.cjs` (`root: true`). `react/prop-types` is on, and blog components declare `propTypes`.
- **Node/npm**: Node 24 is pinned in `.nvmrc`, and CI reads its version from that file. npm 12 blocks dependency install scripts unless they are listed under `allowScripts` in `package.json`. Those entries are pinned to exact versions, so bumping `esbuild`/`fsevents` requires `npm install-scripts approve <pkg>` again.
- **CSP** is a `<meta http-equiv>` in `index.html`. New third-party origins (scripts, fetch targets, fonts) must be added there or they will be blocked. Google Analytics (`gtag`) is loaded in `index.html`, and helpers are in `src/utils/analytics.js`.
- **Env vars** (Vite, client-side, in `.env.local`, gitignored): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (Contact form) and `VITE_RESUME_URL` (`src/utils/secureUrl.js`). They end up in the bundle, so never put real secrets in `VITE_*`. `security-check.sh` greps `dist/` for leaked resume URLs.
- **SPA fallback**: `public/_redirects` (`/* /index.html 200`). Generated static files under `dist/blog/` take precedence.
- Site origin `https://vedanthramanathan.com` is hardcoded in `pageMeta.js` and `build-blog.mjs`.
- `dist/` is build output and is gitignored. Don't commit it.
