import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // React 개발 서버 (5173) 설정
    proxy: {
      // '/uploads'로 시작하는 모든 요청을 Spring Boot 서버로 전달
      "/uploads": {
        target: "http://localhost:8080", // ⬅️ Spring Boot 서버의 주소와 포트
        changeOrigin: true, // 호스트 헤더를 타겟 URL에 맞게 변경
        secure: false, // HTTPS가 아닐 경우
      },
      // 다른 API 요청 경로도 필요하면 추가 (예: '/api')
      // '/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   secure: false,
      // }
    },
  },
});
