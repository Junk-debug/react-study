// vitest.config.ts
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "*config*",
        ".eslintrc.cjs",
        "src/main.tsx",
        "**/*.d.ts",
        "test/setup.ts",
        ...configDefaults.exclude,
      ],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.ts",
  },
});
