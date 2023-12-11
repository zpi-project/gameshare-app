import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ValidateEnv(),
    svgr(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    outDir: "./build",
  },
});
