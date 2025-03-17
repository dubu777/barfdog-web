import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";

interface DelayShippingCompletedPageParams {
  params: {
    subscribeId: number;
  }
}

export default async function DelayShippingCompletedPage({ params }: DelayShippingCompletedPageParams) {
  const subscribeId = Number(params.subscribeId);
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <div>

          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
