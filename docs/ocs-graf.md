# ocs-graf 적용 가이드

## 프로젝트 현황
- Turborepo 기반 모노레포
- `apps/next-app`은 Next.js 14 / ESLint 8 조합을 사용
- 루트 `package.json`에서 Prettier를 개별 관리
- 각 패키지마다 `.eslintrc.js`로 설정 유지

## 적용 시 목표
1. 모노레포 루트에서 Prettier 공유 설정을 한 번만 선언
2. Next 14 환경에서는 `.eslintrc.js`에 `@ogq/front-config/eslint`(legacy) 확장을 사용
3. 패키지별로 필요한 추가 룰만 보강

## 적용 순서

### 1. 패키지 설치
루트에서 실행합니다.
```bash
npm i -D @ogq/front-config
```
모든 워크스페이스에서 같은 버전이 사용되도록 루트 `package.json`에만 추가합니다.

### 2. Prettier 공유 설정 연결
루트 `package.json`에 아래 항목을 추가합니다.
```json
{
  "prettier": "@ogq/front-config/prettier"
}
```
- 기존 `prettier` 의존성은 유지해도 되지만 버전은 3 이상이어야 합니다.

### 3. Next 앱 ESLint 설정 업데이트
`apps/next-app/.eslintrc.js`를 다음처럼 수정합니다.
```js
module.exports = {
  root: true,
  extends: ["@ogq/front-config/eslint"],
  settings: {
    next: {
      rootDir: ["app/*/"],
    },
  },
};
```
- 기존 `"next"`, `"eslint:recommended"` 확장은 제거합니다.
- 필요하면 `rules` 블록을 추가해 프로젝트 전용 룰을 덧붙일 수 있습니다.

### 4. 다른 패키지 적용(선택)
- Next 기반 앱이 추가로 생기면 위와 동일한 `.eslintrc.js`를 생성해 `extends`만 지정하면 됩니다.
- Vue/Nuxt 패키지는 Prettier 공유 설정만 적용하고 ESLint는 기존 구성을 유지합니다.

### 5. 검증
```bash
npm run lint
```
- 경고가 많을 경우 각 패키지의 `.eslintrc.js`에 `rules`를 추가해 점진적으로 대응합니다.

## 메모
- 모노레포에서는 ESLint가 워크스페이스 별로 동작하므로, 각 앱 디렉터리에 `npm i -D @ogq/front-config`를 별도로 실행할 필요는 없습니다.
- Next 14는 ESLint 8 기반이므로 `@ogq/front-config/eslint`(CommonJS) 버전을 사용해야 합니다.
