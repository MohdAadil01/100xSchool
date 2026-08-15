import axios from "axios";

export const api = axios.create({
  baseURL:
    `${import.meta.env.VITE_API_URL}/api/v1` || "http://localhost:9000/api/v1",
  withCredentials: true,
});
