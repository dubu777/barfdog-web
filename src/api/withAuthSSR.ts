import { AUTH_CONFIG } from "@/constants/auth";
import axios from "axios";
import { cookies } from "next/headers";

export function createSSRRequest() {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  
  const instance = axios.create();
  console.log('?!?!?!?createSSRRequest!?!?!??!')

  if (token) {
    instance.defaults.headers.Authorization = 
      token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }

  return instance;
}