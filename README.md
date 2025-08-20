# Personal Portfolio of Vedanth Ramanathan

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f450702-348f-43c0-879d-3bf8b33edef9/deploy-status)](https://app.netlify.com/sites/vedanthramanathan/deploys)

Website about my projects, activities, links (resume) and more!
Live at [vedanthramanathan.com](vedanthramanathan.com)

## Development

- Install deps: `npm ci`
- Run both client and chat server: `npm run dev:all`
  - Vite dev: http://localhost:5173
  - Chat server: http://localhost:8787 (proxy: /api)

## Environment variables (server-only)

Set these ONLY on the server/host, not in the client and not in git:

- `OPENAI_API_KEY` (optional in dev; when not set, the server replies in demo mode using local `public/knowledge` snippets and optional `#url:` links in prompts)

Client-side vars remain in `.env.local` (ignored by git) for local dev only.

## Build & Run (production)

1. Build client: `npm run build`
2. Start server (also serves `dist/`): `npm start`

The Express server exposes:

- `POST /api/chat` — chat proxy with context ingestion
- `GET /api/health` — health probe
- Serves static files from `dist/` (if present)

## Deploy on Fly.io (server + static UI)

Prereqs: install Fly CLI and log in.

- One-time: create app and set secret
  - `fly launch --no-deploy` (accept Dockerfile)
  - `fly secrets set OPENAI_API_KEY=YOUR_KEY`
- Build and deploy
  - `fly deploy`

The app listens on `PORT=8080` inside the VM, exposed via `[[services]]` in `fly.toml`. Health check is `/api/health`. Static client is served by the Node server from `dist/`.

## What to commit vs ignore

Commit:

- `src/` application code
- `server/` server code (no secrets)
- `public/` assets and curated `public/knowledge/*.md|*.txt` docs (no secrets)
- Config files, CI, README, etc.

Ignore (already in .gitignore):

- `node_modules/`, `dist/`
- `.env`, `.env.*`, `.env.local`, and other env files
- Temporary/OS files under `public/knowledge` (e.g., `.DS_Store`, `*.bak`, `*.tmp`)
- Logs under `server/`

## CI/CD notes

The GitHub Actions workflow runs lint, builds the client, and validates the server entry exists. For deployment, run `npm run build` then `npm start` on your host. Ensure `OPENAI_API_KEY` is configured in the host environment if you want live model answers.
