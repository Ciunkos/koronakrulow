import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

// Replaces the eslint-config-react-app checks that Create React App ran
// during the build. The build no longer lints; run `npm run lint`.
export default [
  {
    ignores: ["build/", "node_modules/", "stubs/"],
  },
  {
    files: ["src/**/*.{js,jsx}"],
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
      // The game is plain JavaScript without prop types.
      "react/prop-types": "off",
      // Same settings as eslint-config-react-app.
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "react/jsx-uses-react": "warn",
      // The TV clips and the music have no caption files to attach.
      "jsx-a11y/media-has-caption": "off",
    },
  },
  {
    files: ["src/**/*.test.{js,jsx}", "src/setupTests.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
    },
  },
  {
    files: ["*.js", "leaderboards/**/*.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
