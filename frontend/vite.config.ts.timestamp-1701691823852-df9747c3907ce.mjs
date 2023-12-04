// vite.config.ts
import { ValidateEnv } from "file:///home/maria/studia/gameshare-app/frontend/node_modules/@julr/vite-plugin-validate-env/dist/index.mjs";
import react from "file:///home/maria/studia/gameshare-app/frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///home/maria/studia/gameshare-app/frontend/node_modules/vite/dist/node/index.js";
import istanbul from "file:///home/maria/studia/gameshare-app/frontend/node_modules/vite-plugin-istanbul/dist/index.mjs";
import svgr from "file:///home/maria/studia/gameshare-app/frontend/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///home/maria/studia/gameshare-app/frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ValidateEnv(),
    svgr(),
    istanbul({
      cypress: true,
      requireEnv: false
    })
  ],
  build: {
    outDir: "./build"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tYXJpYS9zdHVkaWEvZ2FtZXNoYXJlLWFwcC9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWFyaWEvc3R1ZGlhL2dhbWVzaGFyZS1hcHAvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWFyaWEvc3R1ZGlhL2dhbWVzaGFyZS1hcHAvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBWYWxpZGF0ZUVudiB9IGZyb20gXCJAanVsci92aXRlLXBsdWdpbi12YWxpZGF0ZS1lbnZcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGlzdGFuYnVsIGZyb20gXCJ2aXRlLXBsdWdpbi1pc3RhbmJ1bFwiO1xuaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgVmFsaWRhdGVFbnYoKSxcbiAgICBzdmdyKCksXG4gICAgaXN0YW5idWwoe1xuICAgICAgY3lwcmVzczogdHJ1ZSxcbiAgICAgIHJlcXVpcmVFbnY6IGZhbHNlLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCIuL2J1aWxkXCIsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxtQkFBbUI7QUFDelUsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sY0FBYztBQUNyQixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFHMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osS0FBSztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
