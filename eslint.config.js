import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// The build does not lint; run `npm run lint` (or `npm run check`).
export default tseslint.config(
  {
    ignores: ["build/", "node_modules/"],
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  {
    files: ["src/**/*.{ts,tsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Props are typed with TypeScript.
      "react/prop-types": "off",
      "react/jsx-uses-react": "warn",
      // The TV clips and the music have no caption files to attach.
      "jsx-a11y/media-has-caption": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // A destructuring may mix reassigned and constant values.
      "prefer-const": ["error", { destructuring: "all" }],
      // Same settings as eslint-config-react-app had for unused code.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "none", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/setupTests.ts"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
    },
  },
  {
    files: ["*.ts", "*.js", "leaderboards/**/*.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  }
);
