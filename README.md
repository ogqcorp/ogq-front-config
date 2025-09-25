# @ogq/front-config

OGQ 프론트엔드 팀을 위한 ESLint/Prettier 공유 설정입니다. Next.js 기반 프로젝트는 `@ogq/front-config` 하나로 룰을 정리하고, Nuxt/Vue 프로젝트는 Prettier만 공유해 팀 간 포맷을 맞출 수 있습니다.

## 빠른 시작

1. 패키지 설치
   ```bash
   npm i -D @ogq/front-config
   ```
2. Next.js 15 / ESLint 9 (flat config)
   ```js
   // eslint.config.mjs
   import ogq from "@ogq/front-config/eslint/flat";
   export default [...ogq({ withNext: true, useTs: true })];
   ```
3. Next.js 14 이하 / ESLint 8 (legacy)
   ```js
   // .eslintrc.js
   module.exports = {
     extends: ["@ogq/front-config/eslint"],
   };
   ```
4. Prettier 공유 설정
   ```json
   // package.json
   {
     "prettier": "@ogq/front-config/prettier"
   }
   ```

필요하면 각 프로젝트의 `rules`, `ignores`를 추가 블록으로 덧붙여 점진적으로 튜닝하세요.

## 서비스별 적용 가이드
- [chatplus-market-front](docs/chatplus-market-front.md)
- [chatplus-market-admin](docs/chatplus-market-admin.md)
- [ogq-pay-front](docs/ogq-pay-front.md)
- [ocp-settlement-admin-site](docs/ocp-settlement-admin-site.md)
- [ocs-graf](docs/ocs-graf.md)
- [ocs-web-v2](docs/ocs-web-v2.md)
- [nom-market-front](docs/nom-market-front.md)
- [nom-market-admin-front](docs/nom-market-admin-front.md)
- [ocs-admin](docs/ocs-admin.md)
- [ogq-login-server/frontend](docs/ogq-login-server-frontend.md)

## 운영 팁
- 기본 규칙은 대부분 `warn`이므로 기존 코드에 바로 적용해도 빌드가 깨지지 않습니다.
- Vue/Nuxt 프로젝트는 ESLint 플러그인 충돌을 피하기 위해 Prettier만 공유하는 것을 권장합니다.
- 새로운 서비스가 생기면 `docs/`에 전용 가이드를 추가해 README 링크 목록을 업데이트하세요.
