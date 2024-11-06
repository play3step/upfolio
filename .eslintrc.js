module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Prettier와 ESLint 연동
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "unused-imports"],
  rules: {
    "prettier/prettier": "error", // Prettier 관련 규칙 적용
    "unused-imports/no-unused-imports": "error", // 사용되지 않는 import 제거
    "@typescript-eslint/no-unused-vars": "warn", // 사용되지 않는 변수 경고
    "no-console": "warn", // console.log 사용 시 경고
  },
};
