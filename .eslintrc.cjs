module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "vite.config.ts",
    "postcss.config.js",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.app.json",
  },
  plugins: ["react-refresh", "react-compiler", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "react-compiler/react-compiler": "error",
    "react/require-default-props": "off",
  },
};
