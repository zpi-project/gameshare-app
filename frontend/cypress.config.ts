import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    video: false,
    viewportHeight: 900,
    viewportWidth: 1200,
  },
});
