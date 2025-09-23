# @ogq/front-config

OGQ 프론트엔드 팀을 위한 **ESLint / Prettier 공유 설정 패키지**입니다.  
서비스 레포지토리에 설치 후 최소한의 설정만 추가하면 일관된 규칙을 바로 적용할 수 있습니다.

---

## 설치 및 적용 방법

### 1. 패키지 설치

```bash
npm i -D @ogq/front-config
```

### 2. ESLint 설정

#### Flat Config (Next.js/React 최신)

서비스 루트에 `eslint.config.mjs` 파일 생성:

```js
import ogq from "@ogq/front-config/eslint/flat";

export default [...ogq({ withNext: true, useTs: true })];
```

- `withNext: true` → Next.js 프로젝트일 경우
- `useTs: true` → TypeScript 프로젝트일 경우

#### 레거시 Config (.eslintrc.js)

서비스 루트에 `.eslintrc.js` 파일 생성:

```js
require("@ogq/eslint-config/patch");

module.exports = {
  extends: [
    "@ogq/eslint-config",
    "@ogq/eslint-config/mixins/react", // React/Next 프로젝트라면 추가
  ],
};
```

### 3. Prettier 설정

`package.json`에 아래 항목 추가:

```json
{
  "prettier": "@ogq/prettier-config"
}
```

> 기존 `.prettierrc` 파일은 삭제해도 됩니다.

### 4. VS Code 자동 저장 설정 (권장)

`.vscode/settings.json` 파일에 아래 내용 추가:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

_저장 시 Prettier 포맷팅과 ESLint fix가 자동 적용됩니다._

---

## 요약

1. `npm i -D @ogq/front-config`
2. ESLint 설정 파일(`eslint.config.mjs` 또는 `.eslintrc.js`) 추가
3. `package.json`에 `"prettier": "@ogq/prettier-config"` 추가
4. (권장) `.vscode/settings.json`으로 저장 시 자동 포맷/린트 활성화

이 네 단계만 거치면 별도의 플러그인 설치 없이 공통 규칙을 바로 적용할 수 있습니다.

---

## Nuxt(Vue) 프로젝트 주의사항

Nuxt(Vue) 프로젝트에서는 **Prettier만 적용**하세요.

### 설치 및 설정

```bash
npm i -D @ogq/front-config prettier@^3
```

`package.json`에 아래와 같이 추가합니다:

```json
{
  "prettier": "@ogq/front-config/prettier"
}
```

### Prettier 사용 방법

- 코드 스타일 검사:
  ```bash
  npx prettier --check .
  ```
- 전체 파일 자동 수정:
  ```bash
  npx prettier -w .
  ```

> ⚠️ `prettier -w .` 명령은 수백 개 파일을 한 번에 수정할 수 있습니다. 기존 프로젝트라면 다음과 같이 점진적으로 적용하는 것을 권장합니다:
>
> - 새로 수정하는 파일만 VS Code의 formatOnSave로 포맷팅
> - 오래된 파일은 필요할 때만 개별적으로 `prettier -w <파일>` 실행
