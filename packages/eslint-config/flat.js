// ESM flat config for React / Next projects
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default function ogq({ withNext = false, useTs = false } = {}) {
  const base = [
    js.configs.recommended,
    {
      languageOptions: {
        globals: { ...globals.browser, ...globals.es2021 },
      },
    },
    {
      plugins: {
        react: pluginReact,
        "react-hooks": pluginReactHooks,
        import: pluginImport,
      },
      settings: { react: { version: "detect" } },
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "import/order": ["warn", { "newlines-between": "always" }],
      },
    },
  ];

  if (useTs) {
    base.unshift(
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            project: true,
            tsconfigRootDir: process.cwd(),
          },
        },
      }
    );
  }

  if (withNext) {
    base.push({
      rules: {
        "react/no-unknown-property": "off",
      },
    });
  }

  return base;
}
