## 📦 프론트엔드 팀 ESLint/Prettier 공통 설정 패키지 출시!

안녕하세요! 팀 개발 환경 개선을 위해 **@ogq/front-config** 패키지를 만들었습니다!

### 🎯 **왜 만들었나요?**
- 각 프로젝트마다 다른 ESLint/Prettier 설정으로 인한 혼란 해소
- 새 프로젝트 시작할 때마다 설정 복붙하는 번거로움 제거
- 팀 전체 코드 스타일 통일

### ✨ **주요 특징**
- 🚀 **3분 설치**: `npm i -D @ogq/front-config` → 설정 2줄 추가 → 완료!
- 🎯 **점진적 도입**: 기존 프로젝트도 **서비스 중단 없이** 바로 적용 가능
- 📦 **All-in-One**: ESLint 플러그인들 별도 설치 불필요
- 🔧 **Next.js/React/TypeScript 완벽 지원**

### 🚀 **사용법** (정말 간단!)
```bash
npm i -D @ogq/front-config
```
```json
// package.json
{
  "prettier": "@ogq/front-config/prettier"
}
```
```js
// .eslintrc.cjs
module.exports = {
  extends: ["@ogq/front-config/eslint"]
};
```

### 🧪 **실제 적용 테스트 완료**
- **@chatplus-market-front**: `test/ogq-front-config` 브랜치에서 성공적으로 적용
- **@ocs-graf**: Prettier 정상 동작 확인 (모노레포도 OK!)

### 🎯 **기존 프로젝트 걱정 NO!**
- 대부분의 규칙이 **warning**으로 설정되어 있어 CI/CD 통과 보장
- 중요한 규칙(React Hooks 등)만 error로 유지
- 점진적으로 warning들을 하나씩 개선하면 됩니다!

### 📖 **자세한 가이드**
GitHub: https://github.com/ogqcorp/ogq-front-config
README에 모든 사용법과 문제해결 방법 정리되어 있습니다!

### 🙋‍♂️ **테스트 & 피드백 요청**
각자 담당 프로젝트에서 테스트해보시고 이슈 있으면 알려주세요!
- 새 프로젝트: 바로 적용해보세요
- 기존 프로젝트: 브랜치 파서 테스트 후 병합 결정

**@chatplus-market-front** 팀은 `test/ogq-front-config` 브랜치 확인해보시고 병합 여부 결정해주세요!

궁금한 점 있으면 언제든 물어보세요! 🙌