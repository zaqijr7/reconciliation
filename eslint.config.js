import eslintPluginReact from "eslint-plugin-react";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules", ".next", "dist"], // Folder yang diabaikan
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // File yang akan dilinting
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      react: eslintPluginReact,
      "jsx-a11y": eslintPluginJsxA11y,
      prettier: eslintPluginPrettier,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      // Aturan linting
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // Tidak perlu import React di Next.js
      "@typescript-eslint/no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "unused-imports/no-unused-imports": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    },
  },
];
