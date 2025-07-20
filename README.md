# 🧭 Git Convention & Project Structure

## 📌 GitHub 커밋 컨벤션

| 태그 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README 등) |
| `style` | 코드 스타일 변경 (공백, 세미콜론 등) |
| `refactor` | 코드 리팩토링 (기능 변화 없음) |
| `test` | 테스트 코드 추가 및 수정 |
| `chore` | 빌드 설정, 패키지 매니저 설정 등 기타 변경 |
| `perf` | 성능 개선 |
| `ci` | CI 설정 변경 |

**예시**  
```
🔍 [Feat] 로그인 기능 구현  
🔧 [Fix] 로그인 에러 처리 추가  
📝 [Docs] README 커밋 컨벤션 추가
```

---

## 🌿 브랜치 네이밍 규칙

| 브랜치명 | 설명 |
|----------|------|
| `main`   | 배포 가능한 메인 브랜치 |
| `feat/*` | 기능 개발용 브랜치 (예: `feat/login`) |

---

## 📁 폴더 구조

```bash
src/
│
├── assets/              # 이미지, 폰트 등 정적 리소스
│
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 UI 컴포넌트 (Button, Modal 등)
│   └── domain/          # 도메인별 컴포넌트
│
├── hooks/               # 커스텀 훅
├── layouts/             # 페이지 레이아웃
├── pages/               # 라우트 페이지 (React Router 기준)
├── routes/              # 라우터 설정
├── store/               # 상태 관리 (Redux, Zustand 등)
├── types/               # 타입 정의
├── utils/               # 유틸 함수
├── constants/           # 상수 (색상, URL 등)
├── data/                # mock 데이터
├── App.tsx
└── main.tsx
```

---

## 🎨 CSS 네이밍 규칙

- **BEM (Block - Element - Modifier)** 방식 사용  
  예: `note-item__title--active`

---

## 🧹 Prettier / ESLint 설정

### ✅ Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "singleAttributePerLine": true,
  "bracketSameLine": true,
  "endOfLine": "lf",
  "trailingComma": "none",
  "arrowParens": "avoid"
}
```

### ✅ ESLint

```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier", "unused-imports"],
  rules: {
    "prettier/prettier": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

---

## 🔤 변수 / 함수 / 타입 네이밍

| 대상 | 컨벤션 |
|------|--------|
| 변수, 함수 | `camelCase` |
| 컴포넌트, 클래스 | `PascalCase` |
| 타입, 인터페이스 | `PascalCase` (접두어 `I` 생략) |
| 상수 | `UPPER_SNAKE_CASE` |

### 공통 접두/접미 규칙

| 목적 | 예시 접두/접미 | 변수명 예시 |
|------|----------------|-------------|
| 상태 값 | `is`, `has`, `can` | `isOpen`, `hasError` |
| 이벤트 핸들러 | `handle` | `handleClick` |
| 이벤트 콜백 | `on` | `onClose` |
| 렌더 함수 | `render` | `renderItem()` |
| 커스텀 훅 | `use` | `useScroll()`, `useUser()` |

---
