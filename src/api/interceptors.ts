import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { authAxios } from "./axiosInstance";
import { sendLogToNative } from "@/utils/debug/webviewLogger";

type Cfg = InternalAxiosRequestConfig & { _retry?: boolean };

export function attachAuthInterceptors(
  jsonInst: AxiosInstance,
  uploadInst: AxiosInstance
) {
  if (typeof window === "undefined") return;

  const injectToken = (config: InternalAxiosRequestConfig) => {
    const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);

    sendLogToNative('[Interceptor] 토큰 주입 시도', {
      hasToken: !!token,
      tokenLength: token?.length,
      url: config.url
    });

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      sendLogToNative('[Interceptor] Authorization 헤더 설정 완료', {
        authHeader: config.headers.Authorization?.substring(0, 20) + '...'
      });
    }

    return config;
  };

  jsonInst.interceptors.request.use(injectToken);
  uploadInst.interceptors.request.use(injectToken);

  let isRefreshing = false;
  let queue: Array<{ resolve: (t: string) => void; reject: (e: any) => void }> =
    [];
  const flush = (err?: any, token?: string) => {
    queue.forEach((p) => (err ? p.reject(err) : token && p.resolve(token)));
    queue = [];
  };

  const make401Handler = (retryInst: AxiosInstance) => (error: AxiosError) => {
    const original = error.config as Cfg;
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) =>
          queue.push({ resolve, reject })
        ).then((t) => {
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${t}`;
          return retryInst(original);
        });
      }

      isRefreshing = true;
      return authAxios
        .post("/api/v2/public/accounts/refresh")
        .then(({ data, headers }) => {
          const headerToken = headers?.authorization || headers?.Authorization;
          const token =
            typeof headerToken === "string" && headerToken.startsWith("Bearer ")
              ? headerToken.slice(7)
              : data?.accessToken;
          if (!token) throw new Error("토큰 재발급 실패");

          setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, token);
          jsonInst.defaults.headers.common.Authorization = `Bearer ${token}`;
          uploadInst.defaults.headers.common.Authorization = `Bearer ${token}`;
          flush(undefined, token);

          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${token}`;
          return retryInst(original);
        })
        .catch((e) => {
          flush(e);
          return Promise.reject(e);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    return Promise.reject(error);
  };

  jsonInst.interceptors.response.use((r) => r, make401Handler(jsonInst));
  uploadInst.interceptors.response.use((r) => r, make401Handler(uploadInst));
}
