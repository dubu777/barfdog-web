import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetConnectedSns } from "@/api/auth/queries/usePrefetchGetConnectedSns";
import ConnectSns from "@/components/pages/mypage/account/connectSns/ConnectSns";
import Spinner from "@/components/common/spinner/Spinner";

export default async function ConnectSnsPage() {
  const queryClient = new QueryClient();
  await prefetchGetConnectedSns(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>연동된 SNS가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ConnectSns />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
