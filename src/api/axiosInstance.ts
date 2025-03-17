// src/api/axiosClient.ts

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from '@/utils/auth/cookie';
import { AUTH_CONFIG } from "@/constants/auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 환경에 따른 baseURL 설정
const prod = process.env.NODE_ENV === 'production';
const baseURL = prod
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCT
  : process.env.NEXT_PUBLIC_API_URL_DEV;

/**
 * 일반 API 요청에 사용할 axios 인스턴스
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAxios: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * 요청 인터셉터:
 * 모든 요청 시 쿠키에 저장된 액세스 토큰을 Authorization 헤더에 추가합니다.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    console.log('ACCESS_TOKEN_COOKIE', token);
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token.startsWith('Bearer ')
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터:
 * 401(Unauthorized) 에러 발생 시 /api/refresh 엔드포인트에 액세스 토큰 재발급 요청 후,
 * 새 토큰으로 원본 요청을 재시도합니다.
 */

// 재발급 요청 중 동시 발생하는 요청들을 처리하기 위한 변수와 큐
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

/**
 * 재발급 요청 후 실패 큐에 대기 중인 요청들을 처리합니다.
 * @param error - 재발급 요청 실패 시 에러 객체
 * @param token - 재발급 요청 성공 시 새 액세스 토큰
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 에러이며, 아직 재시도하지 않은 요청인 경우에만 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // 재발급 요청 중이면 현재 요청은 큐에 추가 후, 새 토큰이 발급되면 재시도합니다.
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // 액세스 토큰 재발급 요청 (/api/refresh)
        // const { data } = await authAxios.get('/api/refresh');
        const { data } = await authAxios.get(`${baseURL}/api/refresh`);
        console.log('새 액세스 토큰 발급:', data);
        
        const newToken: string = data.accessToken;

        // 새 액세스 토큰을 쿠키에 저장합니다.
        // 기본 옵션은 js-cookie 유틸에서 설정된 기본값이 적용됩니다.
        setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, newToken);

        // axiosInstance의 기본 헤더도 업데이트합니다.
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;