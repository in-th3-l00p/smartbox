import axios from "axios";

const api = axios.create({
  baseURL: "http://infopubele.go.ro/api",
  timeout: 1000
});

export default api;
