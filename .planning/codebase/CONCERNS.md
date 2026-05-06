# Codebase Concerns

**Analysis Date:** 2026-05-06

---

## Security Considerations

**Client-side password "protection" is security theater:**
- Risk: The resume password check in `src/components/PasswordModal.jsx` uses `btoa()` (Base64 encoding, not hashing) to compare a password sourced from the `VITE_RESUME_PASSWORD` environment variable. Because all `VITE_*` vars are inlined into the production bundle at build time, any visitor can open DevTools, search the bundle for the base64 string, and decode it in one command.
- Files: `src/components/PasswordModal.jsx` (line 31), `src/utils/secureUrl.js` (line 12)
- Current mitigation: None — the rate-limiting (5 attempts) is also client-side state that resets on page refresh.
- Recommendations: Move resume access entirely to the server. Have the client POST the password to `/api/verify-resume`, perform the check server-side using a real comparison against an environment variable that is never sent to the browser, and return a short-lived signed URL or a redirect only on success.

**EmailJS credentials are hardcoded in source:**
- Risk: The EmailJS service ID (`service_kz9delta`), template ID (`template_129z3c4`), and public key (`nhI9A00KxsAU273Rr`) are all hardcoded as string literals in `src/components/Contact.jsx` lines 39–51. They also appear as commented-out remnants at lines 8–11. These are committed to git history permanently.
- Files: `src/components/Contact.jsx`
- Current mitigation: None — the values are in plaintext in source, not even in environment variables.
- Recommendations: Move to `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` environment variables. Note: for a public portfolio, EmailJS public keys are intentionally client-side-safe, but the service/template IDs should still not be in source for credential hygiene.

**CSP uses `'unsafe-inline'` and `'unsafe-eval'`:**
- Risk: The Content Security Policy in `index.html` includes `'unsafe-inline'` and `'unsafe-eval'` in `default-src`, and `'unsafe-inline'` in `script-src`. This largely nullifies the XSS protection that CSP is meant to provide.
- Files: `index.html` (line 7–10)
- Current mitigation: Other CSP directives (connect-src, img-src) provide partial restriction.
- Recommendations: Remove `'unsafe-eval'` from `default-src`. For inline scripts (Google Analytics, JSON-LD), use nonces or hashes instead of `'unsafe-inline'`. Three.js/R3F require some shader compilation but this can be handled at the `worker-src` level rather than global `unsafe-eval`.

**Server CORS is completely open:**
- Risk: `server/server.js` calls `app.use(cors())` with no options, which allows any origin to POST to `/api/chat` and `/api/verify-resume` (if added). This means any website can use the OpenAI proxy.
- Files: `server/server.js` (line 11)
- Current mitigation: The server is hosted on fly.io; rate limiting is not implemented.
- Recommendations: Restrict `cors({ origin: 'https://vedanthramanathan.com' })`. Add rate limiting middleware (e.g., `express-rate-limit`) to `/api/chat`.

**`secureOpen` bypasses its own URL safety check for non-resume URLs:**
- Risk: `src/utils/secureUrl.js` line 107 only applies `isUrlSafe()` to resume URLs. For all other project links (sourced from `src/constants/index.js`), only a protocol blocklist check is done. A future `source_code_link` with an HTTP URL or a malformed link would pass through unchecked.
- Files: `src/utils/secureUrl.js` (lines 105–134)
- Current mitigation: Current project links are all trusted HTTPS URLs.
- Recommendations: Apply `isUrlSafe()` uniformly to all URLs passed through `secureOpen`.

---

## Tech Debt

**Placeholder / template experiences data is never displayed:**
- Issue: `src/constants/index.js` exports a full `experiences` array (lines 101–154) containing generic template content attributed to Starbucks, Tesla, Shopify, and Meta — none of which are real work history. The array is exported but never imported in any component. The associated assets (`meta`, `shopify`, `starbucks`, `tesla`) are imported in `src/assets/index.js` and exported but unused by any component.
- Files: `src/constants/index.js`, `src/assets/index.js`
- Impact: Dead exports increase bundle size marginally; the template data is misleading to future maintainers who may wonder if an Experience section was accidentally deleted.
- Fix approach: Either build an Experience/Timeline component consuming accurate data, or delete the `experiences` export and the four company image assets.

**`react-vertical-timeline-component` is an unused dependency:**
- Issue: `react-vertical-timeline-component` is listed in `package.json` `dependencies` (line 40) but is not imported anywhere in the codebase. It was presumably the component meant to render the `experiences` data that was never built.
- Files: `package.json`
- Impact: Adds ~30KB+ to install size; appears in `npm outdated` output.
- Fix approach: `npm uninstall react-vertical-timeline-component` and remove the `experiences` export from `src/constants/index.js`.

**`gsap` is an unused dependency:**
- Issue: `gsap` is listed in `package.json` `dependencies` (line 31 — `"gsap": "^3.13.0"`) but is not imported in any source file under `src/`.
- Files: `package.json`
- Impact: Adds ~200KB to install size; is bundled into production if not tree-shaken.
- Fix approach: `npm uninstall gsap` unless there is a planned future use.

**Multiple dead assets in `src/assets/`:**
- Issue: The following assets are imported and re-exported in `src/assets/index.js` but never consumed by any component: `survey.png`, `carrent.png`, `jobit.png`, `docker.png`, `mongodb.png`, `nodejs.png`, `reactjs.png`, `redux.png`, `adobe.svg`, `dart-original.svg`, `canva-original.svg`, `latex-original.svg`, `linux-original.svg`, `figma.png`, `git.png`, and `tripguide.jpg` (`.jpg` duplicate of `tripguide.png`). Company logos `meta.png`, `shopify.png`, `starbucks.png`, and `tesla.png` are also unused by components (only referenced in the dead `experiences` constant).
- Files: `src/assets/index.js`, `src/assets/`
- Impact: Unnecessary files in the repo; some are included in the barrel export adding import overhead. Vite will not bundle unused assets unless explicitly referenced, but the barrel re-export adds noise.
- Fix approach: Remove unused imports from `src/assets/index.js` and delete the corresponding image files.

**`//change` comment on a placeholder URL in constants:**
- Issue: `src/constants/index.js` line 85 contains `link: "https://google.com", //change` — a placeholder link for the HTML 5 technology entry.
- Files: `src/constants/index.js` (line 85)
- Impact: Low. The `link` field on tech entries appears not to be rendered anywhere currently, but it signals unfinished work.
- Fix approach: Either remove the `link` field or update it to the appropriate URL.

**`ErrorBoundary.jsx` is an empty file:**
- Issue: `src/components/ErrorBoundary.jsx` exists as a zero-byte file and is not used anywhere in the app. The app has no error boundary protection around the Three.js Canvas components.
- Files: `src/components/ErrorBoundary.jsx`
- Impact: Three.js WebGL errors in `StarsCanvas` or `CurrentWork`'s `WavyBackground` Canvas will propagate and crash the entire React tree rather than degrading gracefully.
- Fix approach: Implement the ErrorBoundary as a class component wrapping `<StarsCanvas>` and the `CurrentWork` Canvas. Display a fallback (e.g., a static background) when WebGL is unavailable or fails.

**`manifest.json` is a Create React App default and is not customized:**
- Issue: `public/manifest.json` contains the CRA default content with `"short_name": "React App"`, placeholder icon paths (`logo192.png`, `logo512.png`) that do not exist in `public/`, and no reference to the real app name or branding.
- Files: `public/manifest.json`
- Impact: PWA install prompt would show "React App" as the app name. Missing icon files cause 404s for browsers that parse the manifest.
- Fix approach: Update `short_name`, `name`, icons, and `theme_color` to match the portfolio branding. Add actual 192×192 and 512×512 icon PNGs to `public/`.

**Twitter/OG social meta has placeholder `@your_twitter_handle`:**
- Issue: `index.html` lines 72–73 have `content="@your_twitter_handle"` for both `twitter:site` and `twitter:creator`.
- Files: `index.html` (lines 72–73)
- Impact: Twitter card attribution is incorrect for anyone sharing the portfolio link.
- Fix approach: Replace with the real handle or remove the tags.

---

## Performance Bottlenecks

**`WavyBackground` in `CurrentWork` mutates geometry every frame on the CPU:**
- Problem: `src/components/CurrentWork.jsx` lines 12–27 iterate over all vertices of an 80×80 plane geometry (6,561 vertices) every animation frame in the `useFrame` callback, recomputing Z positions with trigonometry and setting `needsUpdate = true`. This is a heavy CPU-side operation that runs whenever the overlay is open.
- Files: `src/components/CurrentWork.jsx`
- Cause: CPU-side geometry mutation instead of a GPU shader approach.
- Improvement path: Replace with a custom GLSL vertex shader (using `ShaderMaterial` with `uTime` uniform) to move the wave computation entirely to the GPU. Alternatively, reduce the plane segment count from 80×80 to 40×40 for a quick win.

**`Contact.jsx` is 554 lines with inline SVG animations and `dangerouslySetInnerHTML` CSS:**
- Problem: The contact section embeds a large static network graph (7 SVG `linearGradient` definitions + 11 `<line>` elements) and injects a `<style>` block via `dangerouslySetInnerHTML` containing 7 keyframe animations. This is all rendered unconditionally even on mobile where it occupies minimal visual space.
- Files: `src/components/Contact.jsx`
- Cause: Animation CSS was added inline rather than in `index.css` or a Tailwind plugin.
- Improvement path: Move keyframe CSS to `src/index.css`. Extract the network graph into a separate `NetworkGraph.jsx` component. Consider lazy-loading it.

**Multiple simultaneous `animate-ping` elements (no reduced-motion support):**
- Problem: `src/components/Contact.jsx` and `src/components/Hero.jsx` each contain 5–6 elements with `animate-ping` (which creates CSS `@keyframes ping` clones). There is no `prefers-reduced-motion` media query applied anywhere.
- Files: `src/components/Contact.jsx`, `src/components/Hero.jsx`, `src/components/CurrentWork.jsx`
- Cause: Tailwind animation classes applied without accessibility consideration.
- Improvement path: Add `motion-safe:animate-ping`, `motion-safe:animate-pulse`, and `motion-safe:animate-bounce` throughout. Configure Tailwind's `screens` with a `motion-safe` variant.

---

## Fragile Areas

**`PasswordModal` reset state does not survive across overlay closes:**
- Files: `src/components/PasswordModal.jsx`, `src/components/Works.jsx`
- Why fragile: `attemptCount` is local component state. Closing and reopening the modal resets it to 0, defeating the 5-attempt brute-force limit. This interacts with the already-broken client-side security model.
- Safe modification: This is only worth fixing in conjunction with moving auth server-side (see Security section).
- Test coverage: No tests exist anywhere in the project.

**`Navbar` navigation logic is a deeply nested if/else chain:**
- Files: `src/components/Navbar.jsx` (lines 58–92 and 120–145)
- Why fragile: Navigation items are matched by `nav.title` string comparison in nested conditionals — the same logic is duplicated in the desktop and mobile menus. Adding or renaming a nav link requires updating both branches and the `navLinks` array in `src/constants/index.js`.
- Safe modification: Refactor to a data-driven approach: add `href`, `external`, and `component` fields to each `navLinks` entry in `src/constants/index.js` and render a single mapping function used by both menus.
- Test coverage: None.

**`CurrentWork` work items are hardcoded inline with no data abstraction:**
- Files: `src/components/CurrentWork.jsx` (lines 100–104)
- Why fragile: The `workItems` array is a `const` inside the component body. Updating "what I'm working on" requires editing JSX directly. The expand/collapse interaction extracts the `firstWord` by string splitting which will break for any item that should display differently.
- Safe modification: Move `workItems` to `src/constants/index.js` as a structured array with `title`, `description` (optional), and rendering metadata. This also makes it maintainable without touching component logic.

---

## Dependencies at Risk

**`react-router-dom` 6.11.2 has a high-severity XSS vulnerability:**
- Risk: CVE via `@remix-run/router <=1.23.1` — open redirect can be used for XSS. `npm audit` reports this as high severity.
- Impact: The app uses `BrowserRouter` and `Link` in `src/App.jsx` and `src/components/Navbar.jsx`. The exposure is limited because there are no dynamic route params, but it is still a known high-severity CVE.
- Migration plan: `npm audit fix` will update to `react-router-dom@6.30.3` which patches the issue. A later migration to v7 would require API changes.

**`vite` 6.3.5 has multiple high-severity vulnerabilities (5 CVEs):**
- Risk: Path traversal in dev server, arbitrary file read via WebSocket, `server.fs.deny` bypass on Windows. These affect the dev server, not production builds, but are still active issues.
- Impact: Affects local development on Windows (the current dev platform per `win32` environment).
- Migration plan: `npm audit fix` updates to `vite@6.4.2` which patches all listed CVEs.

**`flatted` has high-severity prototype pollution:**
- Risk: `flatted <=3.4.1` — prototype pollution via `parse()` and unbounded recursion DoS. This is a transitive dependency.
- Impact: Indirect; `flatted` is used by ESLint's caching layer. Unlikely to affect runtime behavior.
- Migration plan: `npm audit fix`.

**`@react-three/fiber` is 2 major versions behind (8.x installed, 9.x latest):**
- Risk: No known CVEs currently, but Three.js `0.153.0` is also far behind latest (`0.184.0`). The version gap means newer R3F/Three.js features and bug fixes are unavailable.
- Impact: API breakage risk is high across major versions. The `@react-three/drei` package (`9.x`) has a compatible major version (`10.x`) that requires R3F 9.
- Migration plan: Update Three.js and R3F together as a coordinated upgrade. Test `StarsCanvas` and `WavyBackground` thoroughly after upgrading.

**`framer-motion` is 2 major versions behind (10.x installed, 12.x latest):**
- Risk: No current CVEs, but v12 has breaking API changes from v10 (e.g., `AnimatePresence` mode default changes).
- Impact: The app uses `AnimatePresence` in `src/components/CurrentWork.jsx` and `framer-motion` animations throughout.
- Migration plan: Review framer-motion v10→v12 migration guide before upgrading.

---

## Test Coverage Gaps

**No test files exist in the project:**
- What's not tested: Every component, utility function, and server endpoint.
- Files: All files under `src/` and `server/`
- Risk: Any refactor — including the security fixes, dependency upgrades, and dead-code removal listed above — has zero automated safety net.
- Priority: High for `src/utils/secureUrl.js` and `src/utils/analytics.js` (pure functions, easy to test). Medium for component render tests. The `server/server.js` content filtering logic (keyword blocklist) is particularly important to cover since it is a security-adjacent feature.

**`npm test` runs `vite build` instead of a test suite:**
- What's not tested: Everything — `"test": "npm run build"` in `package.json` means CI passes as long as the build compiles.
- Files: `package.json` (line 17)
- Risk: The `"prepare"` hook also runs `npm run test` (i.e., just the build), so installs appear to run tests but do not.
- Priority: High. Add Vitest (already compatible with Vite) and replace the `test` script with `vitest run`.

---

## Missing Critical Features

**No loading state or fallback for the Three.js Canvas in `CurrentWork`:**
- Problem: When the "what i'm working on" overlay is opened, the Three.js `<Canvas>` with `WavyBackground` is mounted inline with no `<Suspense>` fallback and no error boundary. On low-end devices or when WebGL is blocked, the overlay will render blank or throw an unhandled error.
- Blocks: Graceful degradation on mobile/low-power devices.

**No form validation on the Contact form:**
- Problem: `src/components/Contact.jsx` does not validate the `name`, `email`, or `message` fields beyond the browser-native `type="email"` check. An empty name or single-character message will be sent to EmailJS.
- Blocks: Clean data delivery to inbox; user experience on invalid input.

---

*Concerns audit: 2026-05-06*
