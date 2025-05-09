'use client';
import { ReactNode, useEffect, useMemo } from "react";
import { bootChannelIO, BootSettings, shutdownChannelIO } from "@/utils/channelTalk";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";

const ChannelTalkProvider = ({ children }: { children: ReactNode }) => {
	const { data: userInfo } = useGetUserInfo();

	const settings = useMemo(() => {
		if (userInfo !== null) {
			return {
				pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY!,
				profile: {
					name: userInfo?.name,
					mobileNumber: userInfo?.phoneNumber,
					email: userInfo?.email,
				},
				memberId: `bf-${userInfo.memberId}`,
			}
		} else {
			return {
				pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY!,
			}
		}
	}, [userInfo])

	useEffect(() => {
		const bootChannelInit = async () => {
			await bootChannelIO(settings as BootSettings);
		};
		bootChannelInit();

		return () => {
			// 클린업: 컴포넌트 언마운트 혹은 settings 변경 시 실행됨
			// 로그인/로그아웃 반복 시 ChannelIO 내부 상태 꼬임 방지 및 memberId가 바뀔 때 명확히 이전 세션 종료 등 방어적 관점에서 적용
			shutdownChannelIO();
		}
	}, [settings])

	return <>{children}</>
}

export default ChannelTalkProvider;