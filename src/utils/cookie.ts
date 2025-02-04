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

const setCookie = (name: string, value: string, days: number) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
	cookies().set(name, value, {
		httpOnly: true,
		maxAge: (days * 24 * 60 * 60),
		expires: expires.toUTCString(),
		sameSite: 'strict',
		path: '/',
	});
}