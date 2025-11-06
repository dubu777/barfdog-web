import { loadScript } from '@channel.io/channel-web-sdk-loader';

export type { BootSettings };

interface Profile {
	name: string;
	mobileNumber: string;
	email: string;
}

interface BootSettings {
	pluginKey: string;
	memberId?: string;
	profile?: Profile;
}

export const bootChannelIO = async (settings: BootSettings) => {
	await loadScript();

	if (typeof window !== 'undefined' && window.ChannelIO) {
		window.ChannelIO('boot', settings);
	} else {
		console.error('ChannelIO is not available.');
	}
};

export const shutdownChannelIO = () => {
	if (typeof window !== 'undefined' && window.ChannelIO) {
		window.ChannelIO('shutdown');
	}
};

export const openChatChannelIO = () => {
	if (typeof window !== 'undefined' && window.ChannelIO) {
		window.ChannelIO('openChat');
	}
};

export const trackChannelEvent = (eventName: string, props?: Record<string, any>) => {
	if (typeof window !== 'undefined' && window.ChannelIO) {
		window.ChannelIO('track', eventName, props);
	}
};

// 대화 초기화 적용 필요시 채널톡 관련 localStorage, cookie 정리 -> 로그아웃시 적용 필요
export const clearChannelIOSession = () => {
	// localStorage 정리
	Object.keys(localStorage).forEach((key) => {
		if (key.includes('ch-session')) {
			localStorage.removeItem(key);
		}
	});

	// 쿠키 정리
	document.cookie.split(';').forEach((cookie) => {
		const [rawName] = cookie.trim().split('=');
		if (rawName.includes('ch-session')) {
			document.cookie = `${rawName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
		}
	});
};
