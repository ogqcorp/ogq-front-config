# ogq-pay-front 적용 가이드

## 프로젝트 현황
- Next.js 15 / React 19 / TypeScript 사용
- ESLint 9 flat config를 FlatCompat로 변환해 사용 중 (`eslint.config.mjs`)
- `@typescript-eslint/no-explicit-any` 등 일부 커스텀 룰을 사용
- Prettier는 개별 의존성으로 관리

## 적용 시 목표
1. `@ogq/front-config/eslint/flat` 기반 설정으로 전환하면서 커스텀 룰 유지
2. 공유 Prettier 설정을 연결해 포맷 스타일 통일
3. 불필요한 FlatCompat 관련 패키지 제거

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. ESLint 설정 교체
`eslint.config.mjs`를 다음과 같이 수정합니다.
```js
import ogq from "@ogq/front-config/eslint/flat";

export default [
  ...ogq({ withNext: true, useTs: true }),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowObjectTypes: "always",
        },
      ],
    },
  },
];
```
- 기존 `FlatCompat` 선언과 `compat.extends(...)` 호출은 모두 제거합니다.
- 커스텀 룰은 마지막 객체의 `rules`에 그대로 유지하면 됩니다.

### 3. Prettier 공유 설정 연결
`package.json`에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```

### 4. 의존성 정리(선택)
- `@eslint/eslintrc`, `eslint-config-next` 등 FlatCompat 의존성은 제거할 수 있습니다.
- `npm ls @ogq/front-config`로 설치 상태를 확인합니다.

### 5. 검증
```bash
npm run lint
npm run lint -- --fix # 필요 시 자동 수정
```
- 경고가 예상보다 많다면 `eslint.config.mjs` 마지막 블록에서 추가 룰을 보강하세요.

## 메모
- Next.js 15는 `eslint.config.mjs`만 사용하므로 `.eslintrc.*` 파일은 삭제해야 합니다.
- 타입 전용 룰을 더 강화하고 싶다면 `ogq({ useTs: true })` 옵션을 그대로 유지한 채 `rules`를 확장하면 됩니다.
