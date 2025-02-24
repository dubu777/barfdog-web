'use server';
import {cookies} from "next/headers";

export { getCookie, setCookie };

const getCookie = async (name: string) => {
	if (typeof window === 'undefined') {
		// 서버 측
		const cookie = cookies().get(name);
		return cookie?.value ?? '';
	} else {
		// 클라이언트 측
		const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
		return value ? value[2] : '';
	}
}

const setCookie = (name: string, value: string) => {
	cookies().set(name, value, {
		httpOnly: true,
		sameSite: 'strict',
		path: '/',
	});
}