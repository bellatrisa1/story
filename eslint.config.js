import js from "@eslint/js";
import ts from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";
export default ts.config(
  { ignores: ["dist/**"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["*.{js,ts}", "scripts/**/*.mjs", "tests/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": hooks },
    rules: hooks.configs.recommended.rules,
  },
);
