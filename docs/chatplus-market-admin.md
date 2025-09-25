# chatplus-market-admin 적용 가이드

## 프로젝트 현황
- Next.js 15 / React 19 / TypeScript 사용
- ESLint 9 flat config를 FlatCompat로 래핑해 사용 중 (`eslint.config.mjs`)
- Prettier 의존성은 따로 관리 중이며 공유 설정 미적용

## 적용 시 목표
1. `@ogq/front-config/eslint/flat`으로 ESLint 설정을 일원화
2. 프로젝트에 필요한 ignore 패턴은 유지
3. 공유 Prettier 설정을 도입해 코드 스타일을 통일
4. 중복 ESLint/Prettier 의존성 제거

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. ESLint 설정 교체
`eslint.config.mjs`를 아래처럼 정리합니다.
```js
import ogq from "@ogq/front-config/eslint/flat";

export default [
  ...ogq({ withNext: true, useTs: true }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
```
- 기존 `FlatCompat` 관련 코드와 `compat.extends(...)` 호출은 모두 제거합니다.
- 추가로 필요한 규칙이 있다면 마지막 객체에 `rules`를 추가하면 됩니다.

### 3. Prettier 공유 설정 연결
`package.json`의 루트에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```

### 4. 의존성 정리(선택)
- `@eslint/eslintrc`, `eslint-config-next` 등 FlatCompat 전용 패키지는 제거 가능합니다.
- `npm ls @ogq/front-config`로 공유 패키지가 정상 설치됐는지 확인합니다.

### 5. 검증
```bash
npm run lint
npm run lint -- --fix # 필요 시 자동 수정
```
- 기존 lint 룰과 충돌하는 경우 `rules` 블록에 보강 규칙을 추가합니다.

## 메모
- Next.js 15에서는 `next lint`가 `eslint.config.mjs`를 읽으므로 별도의 `.eslintrc.*` 파일이 없어야 합니다.
- Ignore 목록이 프로젝트 특성상 중요하므로 공유 설정 추가 후에도 반드시 유지하십시오.
