import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import UserInfo from "@/components/pages/mypage/account/userInfo/UserInfo";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetUserInfo } from "@/api/mypage/account/queries/prefetchGetUserInfo";

export default async function UserInfoPage() {
	const queryClient = new QueryClient();
	await prefetchGetUserInfo(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<Error />}>
				<Suspense fallback={<Spinner fullscreen />}>
					<UserInfo />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	)
}
