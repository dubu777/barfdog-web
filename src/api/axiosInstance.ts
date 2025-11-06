import axios from "axios";
import { attachAuthInterceptors } from "./interceptors";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_API_URL_DEV;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const authAxios = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const uploadAxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
});

attachAuthInterceptors(axiosInstance, uploadAxiosInstance);
export default axiosInstance;
