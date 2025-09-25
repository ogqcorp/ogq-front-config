# ocs-web-v2 적용 가이드

## 프로젝트 현황
- Nuxt 3 / Vue 3 기반 SPA
- ESLint는 Nuxt 기본 preset(`@nuxt/eslint-config`)을 사용 중
- `@ogq/front-config`를 devDependencies에 추가했으며 Prettier 공유 설정을 이미 도입

## 적용 시 목표
1. Prettier 공유 설정을 유지하면서 ESLint는 Nuxt 기본 구성을 사용
2. 향후 ESLint 마이그레이션 시 고려 사항을 정리

## 현재 구성 확인
- `package.json`에 `"prettier": "@ogq/front-config/prettier"`가 이미 선언되어 있다면 그대로 유지합니다. 없다면 아래 단계에서 추가하세요.
- `.eslintrc.js`는 Nuxt preset과 Storybook 플러그인만 확장합니다.

## 권장 운영 방법
1. **Prettier 유지**: 추가 작업 없이도 전 팀 공통 포맷이 유지됩니다.
2. **ESLint 커스텀**: Nuxt 기본 규칙과 충돌하지 않도록 필요한 룰만 `.eslintrc.js`의 `rules`에 추가합니다.
3. **추가 플러그인**: Vitest 등 별도 플러그인은 `plugins`/`overrides`로 계속 관리합니다.

## 향후 ESLint 통합을 고려한다면
- Nuxt 공식 preset이 아직 flat config 전환을 완료하지 않았으므로, 단기적으로는 `@ogq/front-config/eslint`를 바로 도입하기 어렵습니다.
- Nuxt preset이 flat config를 지원하게 되면, `eslint.config.mjs`로 전환 후 `...ogq({ useTs: true })` + Nuxt용 설정을 병합하는 방식으로 확장할 수 있습니다.

## 점검 명령어
```bash
npm run lint
npm run lint:fix
```
- 경고가 많을 경우, 점진적으로 규칙을 끄거나 팀 룰에 맞춰 수정합니다.
