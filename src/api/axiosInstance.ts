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
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsImlzcyI6ImJhcmZkb2ciLCJleHAiOjE3MzEwNjIzODAsImVtYWlsIjoiZnJlc2hvdXJAbmF2ZXIuY29tIn0.a_mE9nx0D4cdM4S2yQqiqWLfVbKOW1ANjEwG5bBlhQGEr-8XhP28vjJKussdYg4A7eQYoJR5IZ5v7_BrubCxtQ'
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