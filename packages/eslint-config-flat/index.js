// ESLint v9 전용 설정 (React/Next.js 프로젝트용)
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
        // 🎯 React 관련 유연한 설정
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react/no-unknown-property": "off",

        // ⚡ 중요한 훅 규칙만 error
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        // 📦 Import 관련 부드러운 규칙
        "import/order": "off", // 점진적 적용
        "import/no-unresolved": "off",

        // 🌟 기본 품질 규칙들 (warning)
        "prefer-const": "warn",
        "no-var": "warn",
        "no-console": "off",
        "no-unused-vars": "warn",
      },
    },
  ];

  if (useTs) {
    // TypeScript 설정도 유연하게
    base.unshift(
      ...tseslint.configs.recommended.map(config => ({
        ...config,
        rules: {
          ...config.rules,
          // TypeScript 관련 에러들을 warning으로
          "@typescript-eslint/no-unused-vars": "warn",
          "@typescript-eslint/no-explicit-any": "warn",
          "@typescript-eslint/ban-ts-comment": "off",
          "@typescript-eslint/no-wrapper-object-types": "warn",
          "@typescript-eslint/no-unused-expressions": "warn",
        }
      }))
    );
  }

  if (withNext) {
    base.push({
      rules: {
        // Next.js 관련도 warning으로
        "@next/next/no-img-element": "warn",
        "react/no-unknown-property": "off",
      },
    });
  }

  return base;
}