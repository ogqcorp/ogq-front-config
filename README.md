# @ogq/front-config

🛠️ **OGQ 프론트엔드 팀을 위한 ESLint/Prettier 공유 설정**
✨ 모든 플러그인이 포함되어 **별도 설치 없이 바로 사용** 가능
🎯 **점진적 도입 전략**으로 기존 프로젝트에 **서비스 중단 없이** 바로 적용

## 🚀 빠른 시작

```bash
# 1. 설치
npm i -D @ogq/front-config

# 2. ESLint 설정 파일 생성
```

**새 프로젝트** (eslint.config.mjs 생성)

```js
import ogq from "@ogq/front-config/eslint/flat";
export default [...ogq({ withNext: true, useTs: true })];
```

**기존 프로젝트** (.eslintrc.js 생성 또는 수정)

```js
module.exports = {
  extends: ["@ogq/front-config/eslint"],
};
```

```json
# 3. Prettier 설정 (package.json에 추가)
{
  "prettier": "@ogq/front-config/prettier"
}
```

**완료!** 🎉 이제 저장 시 자동으로 포맷팅과 린트가 적용됩니다.

> ✅ **기존 프로젝트 걱정 NO!** 대부분의 룰이 warning으로 설정되어 있어 **서비스 중단 없이** 바로 적용 가능합니다.

---

## 📋 상세 설정 가이드

### ESLint 설정

**최신 프로젝트** (Next.js/React + TypeScript)

```js
// eslint.config.mjs
import ogq from "@ogq/front-config/eslint/flat";
export default [...ogq({ withNext: true, useTs: true })];
```

**레거시 프로젝트**

```js
// .eslintrc.js
module.exports = {
  extends: ["@ogq/front-config/eslint"],
};
```

### Prettier 설정

```json
// package.json
{
  "prettier": "@ogq/front-config/prettier"
}
```

### VS Code 자동 저장 (권장)

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

---

## 🎯 프로젝트별 가이드

### React/Next.js

✅ ESLint + Prettier 모두 적용
✅ `withNext: true` 옵션 사용

### Nuxt/Vue

⚠️ **Prettier만 적용** (ESLint는 Nuxt 기본 설정 사용)

```bash
npm i -D @ogq/front-config
# package.json에 prettier 설정만 추가
```

### 모노레포 (Turborepo, Lerna 등)

**Prettier**: ✅ 루트에서 설정하면 전체 적용
**ESLint**: ⚠️ 각 워크스페이스에 개별 설치 필요

```bash
# 루트에서 Prettier 설정
npm i -D @ogq/front-config
# 루트 package.json에 추가
{
  "prettier": "@ogq/front-config/prettier"
}

# 각 앱/패키지에서 ESLint 설정
cd apps/my-app
npm i -D @ogq/front-config
# 각각의 .eslintrc.js에 설정
```

---

## 💡 팁

- 🔄 **기존 설정 제거**: `.eslintrc.*`, `.prettierrc.*` 파일 삭제 가능
- 📦 **의존성 정리**: 기존 eslint 플러그인들 제거 가능 (모두 포함됨)
- 🎨 **점진적 적용**: 기존 프로젝트는 새 파일부터 적용 후 점진적 확장

---

## 🎯 점진적 도입 전략

**기존 프로젝트에 바로 적용해도 안전합니다!**

### 📊 룰 설정 전략
- ✅ **Warning**: 코드 품질 개선 가이드 (CI 통과)
- ⚠️ **Error**: 반드시 지켜야 할 핵심 룰만 (예: react-hooks/rules-of-hooks)
- 🚫 **Off**: 개발 편의성을 위해 비활성화 (예: no-console)

### 🔄 점진적 개선 방법
1. **즉시 도입**: 패키지 설치 → 바로 CI/CD 통과
2. **Warning 확인**: `npm run lint`로 개선할 부분 파악
3. **하나씩 개선**: 새 작업 시마다 warning 몇 개씩 수정
4. **팀 단위 개선**: 코드 리뷰 시 warning 개선 권장

### 🚨 문제 해결

**ES Module 오류가 나는 경우:**
```bash
# 해결방법: Legacy config 사용
# eslint.config.mjs 삭제하고 .eslintrc.cjs 생성
module.exports = {
  extends: ["@ogq/front-config/eslint"]
};
```

**너무 많은 Warning이 나오는 경우:**
```javascript
// .eslintrc.cjs에서 특정 룰 비활성화
module.exports = {
  extends: ["@ogq/front-config/eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off" // any 사용 허용
  }
};
```
