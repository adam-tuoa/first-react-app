import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  // add your-repo-name
  base: "/first-react-app",
  plugins: [react()],
});
