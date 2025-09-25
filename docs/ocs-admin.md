# ocs-admin 적용 가이드

## 프로젝트 현황
- Vue CLI 4 기반 / Vue 3 사용
- `.eslintrc.js`에서 Vue Essential preset과 기본 ESLint 규칙 사용
- Prettier 2.x를 개별 설치해 포맷 스크립트(`npm run pretty`)로 실행 중

## 적용 시 목표
1. Prettier만 `@ogq/front-config/prettier`로 통일
2. ESLint는 기존 구성을 유지하되 필요 시 경고를 줄이는 방향으로만 조정

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. Prettier 공유 설정 연결
`package.json` 최상단에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```
- 스크립트(`npm run pretty`)는 그대로 유지해도 됩니다. 실행 시 공유 설정을 자동으로 사용합니다.

### 3. ESLint 유지
- Vue CLI 4는 ESLint 8 기반으로 최신 flat config와 호환되지 않으므로 기존 `.eslintrc.js`를 유지합니다.
- 필요하면 `rules`에 `"no-unused-vars": "warn"` 등 추가 룰을 지정해 경고를 최소화하세요.

### 4. 검증
```bash
npm run lint
npm run pretty -- --check # prettier 플러그인 사용 시
```

## 메모
- 공유 Prettier 설정은 세미콜론/따옴표/줄바꿈 폭 등을 맞춰 팀 간 포맷 차이를 줄여 줍니다.
- ESLint 설정을 크게 변경하고 싶다면 Vue CLI에서 Vite 기반으로 마이그레이션한 후 검토하는 편이 안전합니다.
