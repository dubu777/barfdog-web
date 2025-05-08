'use client';
import { ReactNode, useEffect, useMemo } from "react";
import { bootChannelIO, shutdownChannelIO } from "@/utils/channelTalk";
import { useAuthStore } from "@/store/useAuthStore";

const ChannelTalkProvider = ({ children }: { children: ReactNode }) => {
	const { detailUserInfo: userInfo } = useAuthStore();

	const settings = useMemo(() => {
		return {
			pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY!,
			profile: {
				name: userInfo?.name || null,
				mobileNumber: userInfo?.phoneNumber || null,
				email: userInfo?.email || null,
			},
			memberId: !!userInfo ? `bf-${userInfo.memberId}` : null,
			member: !!userInfo,
		}
	}, [userInfo])

	useEffect(() => {
		const bootChannelInit = async () => {
			await bootChannelIO(settings);
		};
		bootChannelInit();

		return () => {
			shutdownChannelIO();
		}
	}, [settings])

	return <>{children}</>
}

export default ChannelTalkProvider;