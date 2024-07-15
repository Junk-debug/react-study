import react from "@vitejs/plugin-react";
// vitest.config.ts
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "*config*",
        ".eslintrc.cjs",
        "src/main.tsx",
        "**/*.d.ts",
        "src/tests/setup.ts",
        ...configDefaults.exclude,
      ],
    },
    environment: "jsdom",
    setupFiles: "src/tests/setup.ts",
  },
});
