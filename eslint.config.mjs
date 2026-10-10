import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "public/**",
    ],
  },
  {
    extends: [...nextCoreWebVitals, ...nextTypescript],
  },
  {
    files: [
      "next.config.js",
      "tailwind.config.js",
      "postcss.config.js",
      "components/header/HeaderIcons.tsx",
    ],
    languageOptions: {
      sourceType: "script",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);