// [EXAM] Http client robuste avec refresh
import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  withCredentials: false,
  timeout: 15000,
});

let isRefreshing = false;
let queue = [];

const flush = (token) => { 
  queue.forEach(fn => fn(token)); 
  queue = []; 
};

http.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("access_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

http.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error?.response?.status !== 401 || original?._retry) throw error;

    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((t) => {
          if (t) original.headers.Authorization = `Bearer ${t}`;
          resolve(http(original));
        });
      });
    }

    try {
      isRefreshing = true;
      original._retry = true;
      const rt = localStorage.getItem("refresh_token");
      if (!rt) throw error;
      
      const { data } = await axios.post(
        (import.meta.env.VITE_API_URL || "http://localhost:5001/api") + "/auth/refresh",
        { refreshToken: rt }
      );
      
      localStorage.setItem("access_token", data.accessToken);
      flush(data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return http(original);
    } catch (e) {
      flush();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      throw e;
    } finally {
      isRefreshing = false;
    }
  }
);
