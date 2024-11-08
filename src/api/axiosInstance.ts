import axios from 'axios';
const getCookie = function (name: string) {
    if (typeof window !== "undefined") {
        const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
        console.log('cookie value', value)
        return value ? value[2] : null;
    }
};

const prod = process.env.NODE_ENV === 'production';
const axiosInstance = axios.create({
    baseURL: prod ? process.env.NEXT_PUBLIC_API_URL_PRODUCT : process.env.NEXT_PUBLIC_API_URL_DEV,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsImlzcyI6ImJhcmZkb2ciLCJleHAiOjE3MzE4ODkyMjUsImVtYWlsIjoiZnJlc2hvdXJAbmF2ZXIuY29tIn0.7QA6o_kfpTdykzFHmLUa2PMUBgcC_r5ZP7m6ZYS1Mm7xyNr4XuqO4gkcyo4_ONtuMkljsf98-Aqab4TSWEyAFA',
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = getCookie('LOGIN_COOKIE');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
export default axiosInstance;