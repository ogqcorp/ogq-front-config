// ESLint v9 전용 설정 (React/Next.js 프로젝트용)
// ESM flat config for React / Next projects
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import pluginNext from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default function ogq({ withNext = false, useTs = false } = {}) {
  const basePlugins = {
    react: pluginReact,
    "react-hooks": pluginReactHooks,
    import: pluginImport,
  };

  if (withNext) {
    basePlugins["@next/next"] = pluginNext;
  }

  const base = [
    js.configs.recommended,
    {
      languageOptions: {
        globals: { ...globals.browser, ...globals.es2021 },
      },
    },
    {
      plugins: basePlugins,
      settings: { react: { version: "detect" } },
      rules: {
        // 🎯 React 관련 유연한 설정
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react/no-unknown-property": "off",

        // 🏷️ 네이밍 컨벤션 (warning으로 점진적 적용)
        "react/jsx-pascal-case": "warn", // 컴포넌트는 PascalCase

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

          // 🏷️ TypeScript 네이밍 컨벤션 (warning)
          "@typescript-eslint/naming-convention": [
            "warn",
            // 컴포넌트 함수는 PascalCase
            {
              selector: "function",
              format: ["PascalCase"],
              filter: {
                regex: "^[A-Z].*",
                match: true
              }
            },
            // Hook 함수는 use로 시작하는 camelCase
            {
              selector: "function",
              format: ["camelCase"],
              filter: {
                regex: "^use[A-Z].*",
                match: true
              }
            },
            // 일반 변수와 함수는 camelCase
            {
              selector: "variableLike",
              format: ["camelCase", "PascalCase", "UPPER_CASE"]
            },
            // 상수는 UPPER_CASE
            {
              selector: "variable",
              modifiers: ["const"],
              format: ["camelCase", "PascalCase", "UPPER_CASE"]
            }
          ],
        }
      }))
    );
  }

  if (withNext) {
    const nextRecommended = pluginNext.configs?.["core-web-vitals"] ?? {};

    base.push({
      ...nextRecommended,
      plugins: {
        ...(nextRecommended.plugins ?? {}),
        "@next/next": pluginNext,
      },
      rules: {
        ...(nextRecommended.rules ?? {}),
        // Next.js 관련도 warning으로
        "@next/next/no-img-element": "warn",
        "react/no-unknown-property": "off",
      },
    });
  }

  return base;
}
