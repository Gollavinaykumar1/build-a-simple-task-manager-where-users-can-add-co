import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/build-a-simple-task-manager-where-users-can-add-co/",
  build: { outDir: "dist", assetsDir: "assets" },
  server: { port: 3000 },
});
