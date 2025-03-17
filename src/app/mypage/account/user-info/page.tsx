import UserInfo from "@/components/pages/mypage/account/userInfo/UserInfo";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetUserInfo } from "@/api/auth/queries/useGetUserInfo";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default async function UserInfoPage() {
	const queryClient = new QueryClient();
	await prefetchGetUserInfo(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>회원 정보가 없습니다.</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<UserInfo />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	)
}
