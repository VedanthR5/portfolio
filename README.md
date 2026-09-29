# Personal Portfolio of Vedanth Ramanathan

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f450702-348f-43c0-879d-3bf8b33edef9/deploy-status)](https://app.netlify.com/sites/vedanthramanathan/deploys)

Website about my projects, activities, links (resume) and more!
Live at [vedanthramanathan.com](https://vedanthramanathan.com)

## Development

Requires Node 24 (see `.nvmrc`; run `nvm use`).

- Install deps: `npm ci`
- Dev server: `npm run dev` (http://localhost:5173)
- Lint: `npm run lint`
- Tests + production build: `npm test`

## Environment variables

Client-side Vite variables go in `.env.local` (ignored by git). They are embedded in the public bundle, so never put real secrets in them.

- `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`: contact form
- `VITE_RESUME_URL`: resume link

## Build & deploy

`npm run build` writes a static site to `dist/`. Netlify publishes `dist/` using that command. `public/_redirects` provides the SPA fallback for client-side routes. Other hosts must serve existing static files before falling back to `index.html`.

## CI

GitHub Actions (`.github/workflows/ci-cd.yml`) runs lint, blog content tests, and the production build on pushes to `main`/`develop` and on PRs to `main`.

## Blog

The notebook lives at `/blog`. See [the blog authoring guide](docs/blog.md) for adding essays and citations.

- `npm run dev`: local Vite preview
- `npm run test:blog`: validate content and filtering
- `npm run build`: production bundle plus per-article metadata pages and sitemap

Generated article HTML provides social/canonical metadata on direct requests.
