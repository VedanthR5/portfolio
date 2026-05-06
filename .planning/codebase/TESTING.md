# Testing Patterns

**Analysis Date:** 2026-05-06

## Test Framework

**Runner:** None configured — no test framework is installed or configured in this project.

**Assertion Library:** None

**Test Configuration Files:** None present (`jest.config.*` and `vitest.config.*` are absent from the project root)

**Run Commands:**
```bash
npm run test    # Currently aliased to: npm run build (NOT a test runner)
npm run prepare # Also runs: npm run build
```

**Important:** The `test` script in `package.json` is set to `"npm run build"` — it runs a production build, not a test suite. There is no actual testing infrastructure.

## Test File Organization

**Test files:** Zero test files exist in `src/` or anywhere outside `node_modules/`. No `.test.js`, `.test.jsx`, `.spec.js`, or `.spec.jsx` files are present in the project source.

**No test directory exists** — there is no `__tests__/`, `tests/`, or `test/` folder in the project root or under `src/`.

## Current Quality Gates

The project relies on these mechanisms instead of tests:

**Build-time validation:**
- `npm run build` (Vite + esbuild) catches import errors, missing modules, and syntax errors
- Manual chunk splitting in `vite.config.js` validates that bundle can be produced

**Lint:**
```bash
npm run lint        # ESLint with max 50 warnings
npm run lint:ci     # ESLint with max 100 warnings (for CI)
npm run lint:fix    # Auto-fix ESLint issues
```
- ESLint config at `.eslintrc.json` enforces `react-hooks/recommended` rules (catches incorrect `useEffect` dependencies)
- Several rules are disabled (`no-unused-vars`, `react/prop-types`) — reduces lint coverage

**Security audit:**
```bash
npm run audit:security   # npm audit --audit-level moderate
npm run audit:deps       # npm outdated
```

**Manual PropTypes validation:** Components define `PropTypes` at runtime — prop type mismatches surface as browser console warnings, not CI failures.

## What Is Tested (Implicitly)

Because `npm run test` runs `npm run build`, a "passing test" means:

1. All JS/JSX files parse without syntax errors
2. All imports resolve to real files
3. Vite can tree-shake and chunk the output successfully
4. No TypeScript errors (project uses JS, but `@types/*` packages are installed for IDE support)

## What Is NOT Tested

- Component rendering behavior
- User interaction flows (click handlers, form submission, modal open/close)
- Framer Motion animation variants produce correct objects
- `utils/analytics.js` — GA event tracking functions fire correctly
- `utils/secureUrl.js` — URL validation logic (`isUrlSafe`, `getSecureUrl`, `secureOpen`)
- `PasswordModal` authentication flow — rate limiting, brute-force counter, base64 comparison
- `Navbar` scroll detection (`useEffect` scroll handler cleanup)
- `CurrentWork` typewriter effect and expand/collapse behavior
- `AnnotatedText` hover/pin/click logic

## Recommendations for Adding Tests

If tests are added, the following setup is recommended for this Vite + React project:

**Suggested framework:** Vitest (native Vite integration, no config overhead)

**Install:**
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Suggested `vitest.config.js`:**
```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
```

**Update `package.json`:**
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

**Suggested test file locations:**
- Co-locate with source: `src/utils/secureUrl.test.js` alongside `src/utils/secureUrl.js`
- Component tests: `src/components/PasswordModal.test.jsx` alongside `src/components/PasswordModal.jsx`

**Highest-priority units to test first (most logic, no DOM dependencies):**
1. `src/utils/secureUrl.js` — pure functions `isUrlSafe`, `getSecureUrl`
2. `src/utils/motion.js` — pure functions returning variant objects (`fadeIn`, `textVariant`, etc.)
3. `src/utils/analytics.js` — mock `window.gtag`, verify guard logic

**Example unit test pattern for utilities:**
```js
// src/utils/secureUrl.test.js
import { describe, it, expect } from 'vitest';
import { isUrlSafe } from './secureUrl';

describe('isUrlSafe', () => {
  it('allows https URLs', () => {
    expect(isUrlSafe('https://example.com')).toBe(true);
  });

  it('blocks javascript: protocol', () => {
    expect(isUrlSafe('javascript:void(0)')).toBe(false);
  });

  it('blocks data: URIs', () => {
    expect(isUrlSafe('data:text/html,<script>alert(1)</script>')).toBe(false);
  });
});
```

**Example component test pattern:**
```jsx
// src/components/PasswordModal.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PasswordModal from './PasswordModal';

describe('PasswordModal', () => {
  it('renders nothing when isOpen is false', () => {
    render(<PasswordModal isOpen={false} onClose={vi.fn()} onSuccess={vi.fn()} itemName="Resume" />);
    expect(screen.queryByText('Protected Content')).toBeNull();
  });

  it('shows modal when isOpen is true', () => {
    render(<PasswordModal isOpen={true} onClose={vi.fn()} onSuccess={vi.fn()} itemName="Resume" />);
    expect(screen.getByText('Protected Content')).toBeTruthy();
  });
});
```

## Mocking Needs

When tests are added, the following will need mocking:

**`window.gtag`** — checked via `typeof window.gtag !== "undefined"` in `analytics.js`:
```js
vi.stubGlobal('gtag', vi.fn());
```

**`import.meta.env`** — used in `secureUrl.js` and `PasswordModal.jsx`:
```js
// In vitest config or test setup:
vi.stubEnv('VITE_RESUME_URL', 'https://example.com/resume.pdf');
vi.stubEnv('VITE_RESUME_PASSWORD', 'testpassword');
```

**`window.open`** — called by `secureOpen` and `AnnotatedText`:
```js
vi.stubGlobal('open', vi.fn());
```

**`localStorage`** — used in `Works.jsx` and `PasswordModal.jsx` for click/failure counts:
```js
// jsdom provides localStorage automatically in test environment
localStorage.clear(); // Reset in beforeEach
```

## Coverage

**Requirements:** None enforced — no coverage thresholds configured.

**View Coverage (once Vitest is added):**
```bash
npm run test:coverage
```

## E2E Tests

No E2E testing framework (Playwright, Cypress) is installed or configured. Not applicable.

---

*Testing analysis: 2026-05-06*
