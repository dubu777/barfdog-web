import { AUTH_CONFIG } from "@/constants/auth";
import axios from "axios";
import { cookies } from "next/headers";

export function createSSRRequest() {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  
  const instance = axios.create();

  const prod = process.env.NODE_ENV === "production";
  const baseURL = prod
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_API_URL_DEV;

  if (token) {
    instance.defaults.headers.Authorization = 
      token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    instance.defaults.baseURL = baseURL;
  }

  return instance;
}