import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ remove '/api'
  withCredentials: true,
});

export default api;