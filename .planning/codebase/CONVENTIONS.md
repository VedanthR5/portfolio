# Coding Conventions

**Analysis Date:** 2026-05-06

## Naming Patterns

**Files:**
- React component files use PascalCase: `Hero.jsx`, `Navbar.jsx`, `PasswordModal.jsx`, `AnnotatedText.jsx`
- Utility files use camelCase: `motion.js`, `analytics.js`, `secureUrl.js`
- Index barrel files are lowercase: `index.js`
- One asset file mixes conventions: `FoodCycle.png` (PascalCase) vs `antihack.jpg` (lowercase) — inconsistent

**Components:**
- All components are PascalCase function declarations or arrow functions: `const Hero = () => {}`
- Sub-components defined in the same file are also PascalCase: `ServiceCard`, `ProjectCard`, `TypewriterText`, `WavyBackground`
- HOC-wrapped exports follow the pattern `Wrapped<ComponentName>`: `WrappedAbout`, `WrappedWorks`, `WrappedContact`
- Wrapped components always set `displayName`: `WrappedAbout.displayName = "About"`

**Variables and Functions:**
- camelCase for all local variables and function names: `handleChange`, `handleSubmit`, `handleProjectClick`, `incrementResumeClickCount`
- Event handlers consistently prefixed with `handle`: `handleChange`, `handleSubmit`, `handleClose`, `handlePasswordSuccess`, `handleProjectClick`
- Boolean state variables use descriptive past-participle or adjective names: `scrolled`, `toggle`, `isLoading`, `isOpen`, `hovered`, `isPinned`
- Counter/index variables: camelCase like `currentCount`, `newCount`, `attemptCount`

**Constants and Data:**
- Exported data arrays from `src/constants/index.js` are camelCase: `navLinks`, `services`, `technologies`, `experiences`, `projects`
- Environment variable references follow Vite convention: `import.meta.env.VITE_RESUME_URL`, `import.meta.env.VITE_RESUME_PASSWORD`

**CSS/Tailwind:**
- All styling is done via Tailwind utility classes directly in JSX — no separate CSS modules
- Custom color tokens defined in `tailwind.config.js`: `primary`, `secondary`, `tertiary`, `black-100`, `black-200`, `white-100`
- Inline style objects used only when Tailwind cannot express the value (e.g., animation keyframes, `backgroundImage` template literals)
- Breakpoint order in class strings: mobile-first, smallest first: `text-[40px] xs:text-[50px] sm:text-[60px] lg:text-[80px]`

## Code Style

**Formatting:**
- No Prettier config detected — formatting is enforced via ESLint only
- Double quotes used for JSX attribute strings and JS strings (consistent throughout)
- Trailing commas present in multi-line arrays and objects
- Semicolons present

**Linting:**
- ESLint with two configs present: `.eslintrc.cjs` (legacy, minimal) and `.eslintrc.json` (active, more rules)
- Active config (`.eslintrc.json`) extends: `eslint:recommended`, `plugin:react/recommended`, `plugin:react/jsx-runtime`, `plugin:react-hooks/recommended`
- Notably disabled rules in `.eslintrc.json`:
  - `react/prop-types: "off"` — PropTypes enforcement disabled at lint level (but components still add PropTypes manually)
  - `no-unused-vars: "off"` — unused variable warnings silenced
  - `react/no-unescaped-entities: "off"` — allows unescaped HTML entities (though `&apos;` is still used)
  - `react/jsx-no-target-blank: "off"`
- Inline `// eslint-disable-next-line` comments used to suppress per-line false positives in Three.js JSX attributes (`Stars.jsx`, `CurrentWork.jsx`)
- Lint run command: `npm run lint` (max 50 warnings allowed in dev, 100 in CI)

## Import Organization

**Order (observed consistently):**
1. Third-party library imports: `import { motion } from "framer-motion"`, `import PropTypes from "prop-types"`
2. Internal path imports from `../` (styles, HOCs, constants, utils): `import { styles } from "../styles"`, `import { SectionWrapper } from "../hoc"`
3. Relative sibling component imports: `import AnnotatedText from "./AnnotatedText"`

**Path Aliases:**
- No `@/` or custom aliases configured in `vite.config.js` — all imports use relative `../` paths
- Barrel files used at `src/components/index.js`, `src/hoc/index.js`, `src/assets/index.js`, `src/components/canvas/index.js` for clean re-exports

**Asset Imports:**
- All image/SVG assets imported via `src/assets/index.js` barrel, never referenced with direct paths inside components

## Error Handling

**Async Operations:**
- Promise `.then()` / `.catch()` style used in `Contact.jsx` for emailjs (not async/await)
- `handleSubmit` in `Contact.jsx` uses `.then(successCallback, errorCallback)` — two-arg form
- Error state shown via `alert()` — no toast/notification system
- `async/await` used in `PasswordModal.jsx` for the artificial rate-limiting delay

**URL/Security Utilities (`src/utils/secureUrl.js`):**
- Try/catch used around `new URL(url)` constructor — catches malformed URLs and returns safe fallback
- Early returns with `console.error` for invalid states rather than throwing
- Returns `"javascript:void(0)"` as a safe no-op fallback string when resume URL is missing

**Analytics (`src/utils/analytics.js`):**
- `typeof window.gtag !== "undefined"` guard before every GA call — no try/catch, assumes global is valid if defined

**No global error boundary active** — `src/components/ErrorBoundary.jsx` exists as a 1-line empty file (not implemented)

## Logging

**Framework:** `console.log` / `console.error` (native browser console)

**Patterns:**
- `console.log` used in `analytics.js` after each GA event fire (debug confirmation messages)
- `console.log` used in `Works.jsx` for resume click counting: `console.log(\`Resume clicked ${newCount} times\`)`
- `console.error` used in `secureUrl.js` for configuration errors and blocked URLs
- `console.error` used in `Contact.jsx` on emailjs failure
- **Note:** Vite production build config drops all `console` and `debugger` statements via `esbuild: { drop: ["console", "debugger"] }` in `vite.config.js` — logs only appear in development

## Comments

**When to Comment:**
- Section headers for logical groupings inside large JSX (e.g., `{/* Animated grid pattern */}`, `{/* Floating geometric shapes */}`)
- Inline comments explaining non-obvious config decisions: `// Reduced from 1500 to 1200 points`
- Commented-out credential references appear in `Contact.jsx` (lines 8-10, 35-36) — leftover development notes
- Security rationale comments in `secureUrl.js` and `PasswordModal.jsx` explain intent

**JSDoc:**
- Used in `src/utils/secureUrl.js` only — JSDoc `@param` and `@returns` tags on all exported functions
- Not used elsewhere in the codebase

## Function Design

**Size:** Functions are generally short (under 30 lines). The main exception is `renderDescription` in `Works.jsx` which is a large switch statement (~90 lines) handling per-project description overrides.

**Parameters:**
- Component props destructured at the function signature level: `const ServiceCard = ({ index, title, icon }) => ...`
- Utility functions use positional parameters with clear names: `getSecureUrl(projectName, fallbackUrl)`

**Return Values:**
- Components always return JSX or `null` (for conditional rendering like `PasswordModal`)
- Utility functions return primitive values or Promises — never throw

## Module Design

**Exports:**
- Default export for every component file: `export default Navbar`
- Named exports for utility functions: `export const trackResumeClick = ...`
- Named exports for data: `export { services, technologies, experiences, projects }`
- Mixed default/named: `src/styles.js` uses named: `export { styles }`

**Barrel Files:**
- `src/components/index.js` — re-exports all components
- `src/hoc/index.js` — re-exports `SectionWrapper`
- `src/assets/index.js` — re-exports all assets
- `src/components/canvas/index.js` — re-exports `StarsCanvas`
- Barrel files use explicit named re-exports, not `export * from`

## PropTypes

All components that accept props define `PropTypes` validation at the bottom of the file, below the component definition:

```jsx
ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
```

Components with no props (e.g., `Navbar`, `Hero`, `About`) omit PropTypes entirely. The ESLint rule `react/prop-types` is disabled, so this is developer-enforced only.

## HOC Pattern

Section-level page components are wrapped using `SectionWrapper` from `src/hoc/SectionWrapper.jsx`:

```jsx
// At the bottom of the component file:
const WrappedAbout = SectionWrapper(About, "about");
WrappedAbout.displayName = "About";
export default WrappedAbout;
```

The HOC wraps the component in a `motion.section` with `staggerContainer` animation, scroll viewport detection, and a named `id` anchor span. Always set `displayName` on wrapped components.

---

*Convention analysis: 2026-05-06*
