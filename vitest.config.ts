import react from "@vitejs/plugin-react";
import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/pages/_app.tsx",
        "src/pages/_document.tsx",
        ...configDefaults.exclude,
      ],
    },
    environment: "jsdom",
    setupFiles: "src/tests/setup.ts",
  },
});
