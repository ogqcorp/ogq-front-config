# ocp-settlement-admin-site 적용 가이드

## 프로젝트 현황
- Next.js 15 / React 19 기반, TypeScript 의존성을 포함
- `.eslintrc`(JSON)으로 Next 기본 설정만 사용 중
- Prettier 공유 설정 미사용

## 적용 시 목표
1. Next 15 권장 방식인 `eslint.config.mjs` + flat config로 전환
2. `@ogq/front-config/eslint/flat`과 `@ogq/front-config/prettier` 도입
3. 기존 룰과 충돌을 최소화하면서 경고 위주로 점진적 도입

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. 새 ESLint 설정 파일 생성
프로젝트 루트에 `eslint.config.mjs`를 생성하고 아래 내용을 추가합니다.
```js
import ogq from "@ogq/front-config/eslint/flat";

export default [...ogq({ withNext: true, useTs: true })];
```

### 3. 기존 `.eslintrc` 제거
- 새 flat config가 적용되도록 루트의 `.eslintrc` 또는 `.eslintrc.*` 파일은 삭제합니다.

### 4. Prettier 공유 설정 연결
`package.json`에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```

### 5. 의존성 점검
- Next 15는 ESLint 9를 포함하므로 별도 `eslint` 버전 업이 필요하지 않습니다.
- `npm ls @ogq/front-config`로 공유 패키지가 제대로 설치됐는지 확인합니다.

### 6. 검증
```bash
npm run lint
npm run lint -- --fix
```
- 경고가 과다하게 발생하면 향후 `.config.mjs` 마지막에 `rules` 블록을 추가해 조정합니다.

## 메모
- Flat config에서는 `extends` 대신 배열 병합 방식을 사용합니다.
- 필요 시 환경 변수나 테스트 전용 무시는 `ignores` 속성으로 추가할 수 있습니다.
