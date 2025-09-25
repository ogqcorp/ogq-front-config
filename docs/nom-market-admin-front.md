# nom-market-admin-front 적용 가이드

## 프로젝트 현황
- Vue CLI 4 기반 / Vue 3 사용
- `.eslintrc.js`에서 Vue Essential preset과 기본 ESLint 규칙을 조합
- Prettier 2.x를 개별 의존성으로 사용 중

## 적용 시 목표
1. ESLint는 기존 구성을 유지
2. Prettier만 `@ogq/front-config/prettier`로 통일해 포맷 스타일을 맞춤

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. Prettier 공유 설정 연결
`package.json` 루트에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```
- `.prettierrc`가 별도로 존재한다면 삭제하거나 비워두고 `package.json` 선언만 유지하세요.

### 3. ESLint 유지
- Vue CLI 4는 아직 ESLint 8 기반이며 flat config 전환이 어렵습니다.
- 필요한 경우 기존 `rules` 블록에서 프로젝트 전용 규칙만 조정합니다.

### 4. 검증
```bash
npm run lint
npm run lint -- --fix
```
- Prettier 결과가 기대와 다르면 `package.json`의 `prettier` 선언을 기준으로 팀 합의를 거쳐 조정합니다.

## 메모
- 공유 Prettier 설정은 세미콜론 사용, 따옴표 등 주요 스타일만 통일합니다.
- ESLint 전환은 Vue CLI가 Vite 기반으로 마이그레이션한 이후 재검토하는 것을 권장합니다.
