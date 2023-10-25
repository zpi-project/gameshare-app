import { Schema, defineConfig } from "@julr/vite-plugin-validate-env";

export default defineConfig({
  VITE_API_URL: Schema.string(),
  VITE_AUTH_CLIENT_ID: Schema.string(),
  VITE_SECURE_LOCAL_STORAGE_HASH_KEY: Schema.string(),
  VITE_SECURE_LOCAL_STORAGE_PREFIX: Schema.string(),
});
