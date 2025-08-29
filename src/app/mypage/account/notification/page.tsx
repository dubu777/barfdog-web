import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetUserInfo } from "@/api/auth/queries/usePrefetchGetUserInfo";
import Notification from "@/components/pages/mypage/account/notification/Notification";
import Spinner from "@/components/common/spinner/Spinner";


export default async function NotificationPage() {
	const queryClient = new QueryClient();
	await prefetchGetUserInfo(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
				<Suspense fallback={<Spinner fullscreen />}>
					<Notification />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	)
}
