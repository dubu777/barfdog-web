import { loadScript } from '@channel.io/channel-web-sdk-loader';

interface Profile {
	name: string | null;
	mobileNumber: string | null;
	email: string | null;
}

interface BootSettings {
	pluginKey: string;
	memberId: string | null; 
	member: boolean;
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

export const trackChannelEvent = (eventName: string, props?: Record<string, any>) => {
	if (typeof window !== 'undefined' && window.ChannelIO) {
		window.ChannelIO('track', eventName, props);
	}
};

// 필요시 track 이벤트 props 객체 추가 정의
// type ChannelEventMap = {
// 	OpenedHelp: { path: string };
// 	ClickedCTA: { label: string; page: string };
// };
//
// export const trackChannelEvent = <T extends keyof ChannelEventMap>(
// 	eventName: T,
// 	props: ChannelEventMap[T]
// ) => {
// 	if (typeof window !== 'undefined' && window.ChannelIO) {
// 		window.ChannelIO('track', eventName, props);
// 	}
// };
