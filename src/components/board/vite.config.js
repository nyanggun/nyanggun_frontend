import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ESM 환경에서는 __dirname이 없으므로 직접 생성
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    ckeditor5({
      theme: resolve(
        __dirname,
        "node_modules",
        "@ckeditor/ckeditor5-theme-lark"
      ),
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 절대경로 import 지원 (예: "@/components/board/WritingEditor")
    },
  },
});
