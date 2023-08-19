import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 1000,
  headers: (localStorage.getItem("token") && {Authorization: `Bearer ${localStorage.getItem("token")}`}) || {}
});

export default api;
