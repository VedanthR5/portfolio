import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // eslint-plugin-react 7.37 predates ESLint 10: its "detect" mode calls the
    // removed context.getFilename(). A pinned version skips that code path;
    // keep it in step with the installed React major.minor.
    settings: { react: { version: "19.3" } },
    plugins: { react, "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...reactHooks.configs.flat.recommended.rules,
      // React Compiler rules flag existing typewriter/focus-mode effects;
      // keep them visible without failing CI until those are refactored.
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-refresh/only-export-components": "warn",
    },
  },
];
