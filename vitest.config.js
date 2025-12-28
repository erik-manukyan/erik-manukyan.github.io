// Vitest configuration for the Vite project.
// Uses jsdom environment and a setup file to install Testing Library helpers.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // allow using global test API like `describe`, `it` without import
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
});
