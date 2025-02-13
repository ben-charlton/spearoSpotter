import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, path.resolve(__dirname, "../"), "");
  
  console.log("Loaded ENV:", env);

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    envDir: "../",
    define: {
      "import.meta.env": JSON.stringify(env),
    },
  };
});