import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import DelayShipping from "@/components/pages/mypage/subscription/delayShipping/DelayShipping";

interface DelayShippingPageParams {
  params: {
    subscriptionId: number;
  }
}

export default async function DelayShippingPage({ params }: DelayShippingPageParams) {
  const subscriptionId = Number(params.subscriptionId);
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, subscriptionId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <DelayShipping subscriptionId={subscriptionId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
