import axios from "axios";

// axios 인스턴스 생성 및 설정
const api = axios.create({
  baseURL: "http://localhost:8080",
  header: { "Content-Type": "application/json" },
});

export default api;
