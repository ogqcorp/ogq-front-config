// ESLint v8 전용 설정 (React/Next.js 프로젝트용)
// 점진적 도입을 위한 유연한 ESLint 설정
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  settings: {
    next: {
      rootDir: ["app/*/", "./"],
    },
  },
  rules: {
    // 🎯 점진적 도입 전략: 대부분 warning으로 설정
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-wrapper-object-types": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-img-element": "warn",

    // ⚡ 꼭 지켜야 할 중요한 룰들만 error로 유지
    "no-undef": "off", // TypeScript에서 이미 체크함
    "no-unused-vars": "off", // TS version 사용
    "react-hooks/rules-of-hooks": "error", // React 훅 규칙은 반드시 지켜야 함

    // 🌟 코드 품질 향상을 위한 부드러운 가이드
    "prefer-const": "warn",
    "no-var": "warn",
    "no-console": "off", // 개발 중에는 허용

    // 📦 Import 관련 부드러운 규칙
    "import/order": "off", // 나중에 점진적으로 적용
    "import/no-unresolved": "off" // 의존성 해결 문제 방지
  }
};
