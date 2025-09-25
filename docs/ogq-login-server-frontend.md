# ogq-login-server/frontend 적용 가이드

## 프로젝트 현황
- Vue 3 기반 SPA (Vite가 아닌 Vue CLI 구성)
- `.eslintrc.cjs`에서 Vue Essential preset과 Prettier skip-formatting preset을 사용 중
- Prettier 2.x 의존성 유지

## 적용 시 목표
1. ESLint는 기존 구성을 유지하면서 Prettier만 공유 설정으로 통일
2. `@vue/eslint-config-prettier/skip-formatting`과 충돌하지 않도록 설정을 맞춤

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. Prettier 공유 설정 연결
`frontend/package.json`에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```
- 기존 Prettier 스크립트(`npm run format`)는 그대로 두면 공유 설정을 사용하게 됩니다.

### 3. ESLint 유지
- `skip-formatting` preset이 Prettier와 충돌하지 않도록 이미 구성돼 있으므로 추가 작업이 필요 없습니다.
- lint 경고를 완화하고 싶다면 `.eslintrc.cjs`에 `rules`를 추가해 개별적으로 조정합니다.

### 4. 검증
```bash
npm run lint
npm run format -- --check
```

## 메모
- Vue CLI 환경은 flat config 전환이 어려우므로 ESLint 공유 설정은 장기 과제로 두는 것이 안전합니다.
- Prettier 3 이상을 요구하므로 `prettier` 버전을 확인해 필요 시 업그레이드하세요.
