import axios from 'axios';
import { getCookie } from "@/utils/cookie";
import { jwtDecode } from "jwt-decode";
import { AUTH_CONFIG } from "@/constants/auth";

const prod = process.env.NODE_ENV === 'production';
const axiosInstance = axios.create({
    baseURL: prod ? process.env.NEXT_PUBLIC_API_URL_PRODUCT : process.env.NEXT_PUBLIC_API_URL_DEV,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    }
});

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

axiosInstance.interceptors.request.use(
  async function (config) {
      const token = await getCookie(AUTH_CONFIG.LOGIN_COOKIE);
      if (token) {
          console.log('token', token)

        config.headers.Authorization = `${token.includes('Bearer') ? '' : 'Bearer '}${token}`;
      }
      // const accessToken = getCookie('ACCESS_COOKIE');
      // const refreshToken = getCookie('REFRESH_COOKIE');
      // if (accessToken && isTokenExpired(accessToken)) {
      //   console.log('Access token 만료, 갱신 시도');
      //   try {
      //     const response = await axios.post('/api/refresh-token', {
      //       refreshToken,
      //     });
      //
      //     const { newAccessToken } = response.data;
      //
      //     // 새 Access Token을 쿠키에 저장
      //     setCookie('ACCESS_TOKEN', newAccessToken, { maxAge: 15 * 60 });
      //
      //     // 요청에 새 Access Token 추가
      //     config.headers.Authorization = `Bearer ${newAccessToken}`;
      //   } catch (err) {
      //     console.error('토큰 갱신 실패:', err);
      //     throw err; // 갱신 실패 시 요청 중단
      //   }
      // }
      return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
//
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error)
//     if (error.response && error.response?.status === 401) {
//       console.log('인증 오류 다시 로그인 필요');
//       // 로그아웃 처리 또는 사용자 리디렉션 필요
//     }
//     return Promise.reject(error);
//   }
// )

export default axiosInstance;