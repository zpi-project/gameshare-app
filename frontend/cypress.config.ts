import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.cypress" });

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
  },

  e2e: {
    setupNodeEvents() {},
    experimentalStudio: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: {
      FRONTEND_URL: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
      googleClientId: process.env.VITE_AUTH_CLIENT_ID,
      googleClientSecret: process.env.AUTH_SECRET,
      googleRefreshToken: process.env.VITE_AUTH_REFRESH_TOKEN,
    },
  },
});
