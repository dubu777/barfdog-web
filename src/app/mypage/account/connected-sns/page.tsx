import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ConnectedSns from "@/components/pages/mypage/account/connectedSns/ConnectedSns";
import Spinner from "@/components/common/spinner/Spinner";
import { prefetchGetUserInfo } from "@/api/mypage/account/queries/prefetchGetUserInfo";

export default async function ConnectSnsPage() {
  const queryClient = new QueryClient();
  await prefetchGetUserInfo(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>연동된 SNS가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ConnectedSns />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
