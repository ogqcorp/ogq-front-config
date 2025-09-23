// 점진적 도입을 위한 관대한 ESLint 설정
// 기존 프로젝트에 ESLint를 도입할 때 사용
module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    // 점진적 도입을 위해 대부분의 에러를 warning으로 변경
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-wrapper-object-types": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-img-element": "warn",

    // 꼭 지켜야 할 중요한 룰들만 error로 유지
    "no-undef": "off", // TypeScript에서 이미 체크함
    "no-unused-vars": "off", // TS version이 있으니까 off
    "react-hooks/rules-of-hooks": "error",

    // 코드 품질 향상을 위한 추가 warning 규칙들
    "prefer-const": "warn",
    "no-var": "warn",
    "no-console": "warn"
  }
};