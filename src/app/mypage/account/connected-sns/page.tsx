import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetConnectedSns } from "@/api/auth/queries/useGetConnectedSns";
import ConnectedSns from "@/components/pages/mypage/account/connectedSns/ConnectedSns";

export default async function CouponPage() {
  const queryClient = new QueryClient();
  await prefetchGetConnectedSns(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>연동된 SNS가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectedSns />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
