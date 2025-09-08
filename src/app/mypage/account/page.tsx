import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetConnectedSns } from "@/api/auth/queries/usePrefetchGetConnectedSns";
import Account from "@/components/pages/mypage/account/Account";
import Spinner from "@/components/common/spinner/Spinner";
import { prefetchGetMyPageInfo } from "@/api/mypage/common/queries/prefetchGetMyPageInfo";

export default async function AccountPage() {
  const queryClient = new QueryClient();
	await prefetchGetMyPageInfo(queryClient);
  await prefetchGetConnectedSns(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>연동된 SNS가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <Account />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
