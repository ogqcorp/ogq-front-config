# nom-market-front 적용 가이드

## 프로젝트 현황
- Nuxt 2 기반 / Vue 2 + Composition API 혼용
- `.eslintrc.js`에서 Nuxt, Airbnb, Vue 플러그인을 함께 사용하며 규칙이 다수 커스터마이징돼 있음
- Prettier는 개별 `.prettierrc` 및 패키지 의존성으로 관리 중

## 적용 시 목표
1. ESLint는 기존 구성을 유지(플러그인 충돌 방지)
2. Prettier만 `@ogq/front-config/prettier`로 통일해 포맷 스타일을 맞춤

## 적용 순서

### 1. 패키지 설치
```bash
npm i -D @ogq/front-config
```

### 2. Prettier 공유 설정 연결
- 루트 `package.json`에 아래 항목을 추가하거나 교체합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```
- 기존 `.prettierrc`가 있다면 내용은 제거하고 `package.json` 선언만 유지하는 것을 권장합니다.

### 3. ESLint는 유지
- 현재 Nuxt 2 / Vue 2 조합에서는 Nuxt 공식 preset과 Airbnb 확장이 많은 규칙을 포괄하므로 그대로 운영합니다.
- 추가로 끄고 싶은 룰이 있다면 기존 `rules` 블록에서 조정합니다.

### 4. 검증
```bash
npm run lint
npm run lint -- --fix
```
- Prettier 포맷이 바뀌는 경우 Git diff를 확인하고 팀 합의 후 적용합니다.

## 메모
- Nuxt 2 환경은 ESM flat config와 호환성이 좋지 않으므로 ESLint 전환은 장기 과제로 두세요.
- `@ogq/front-config/prettier`는 Prettier 3 이상의 버전을 요구하므로 `npm info prettier version`으로 버전을 체크한 뒤 필요하면 업데이트합니다.
