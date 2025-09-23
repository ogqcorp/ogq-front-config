require("./patch");

module.exports = {
  // Rush Stack의 기본 규칙 세트를 가져옵니다.
  extends: ["@rushstack/eslint-config/profile/web-app"],

  // ESLint 설정을 특정 파일이나 폴더에 다르게 적용할 때 사용합니다.
  // 여기서는 TypeScript 파서 설정을 추가합니다.
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: { project: true, tsconfigRootDir: __dirname },
    },
  ],

  // 팀의 요구에 따라 'any' 사용을 허용
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
