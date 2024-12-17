import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import SubscriptionSkipDelivery from "@/components/pages/mypage/subscriptionSkipDelivery/SubscriptionSkipDelivery";

interface SkipDeliveryPageParams {
  params: {
    subscribeId: string;
  }
}

export default async function SkipDeliveryPage({ params }: SkipDeliveryPageParams) {

  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, params.subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionSkipDelivery subscribeId={params.subscribeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
