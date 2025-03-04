import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetUserInfo } from "@/api/auth/queries/useGetUserInfo";
import Notification from "@/components/pages/mypage/account/notification/Notification";

export default async function NotificationPage() {
	const queryClient = new QueryClient();
	await prefetchGetUserInfo(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<Notification />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	)
}
