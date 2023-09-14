import { AuthResponse } from "../models/response/AuthResponse";
import axios from "axios";

export const BASE_URL = "http://localhost:3000/api";
export const BASE_URL_AUTH = "http://localhost:3000/api/auth";
export const BASE_URL_USER = "http://localhost:3000/api/users";

export const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL_AUTH,
});

export const $api_users = axios.create({
  withCredentials: true,
  baseURL: BASE_URL_USER,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api_users.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${BASE_URL_AUTH}/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Не авторизован");
      }
    }
    throw error;
  }
);
