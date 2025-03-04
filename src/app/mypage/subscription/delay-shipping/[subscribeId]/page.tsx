import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import SubscriptionSkipDelivery from "@/components/pages/mypage/subscriptionSkipDelivery/SubscriptionSkipDelivery";
import DelayShipping from "@/components/pages/mypage/subscription/delayShipping/DelayShipping";
import {getProductionDates} from "@/utils";

interface DelayShippingPageParams {
  params: {
    subscribeId: number;
  }
}

export default async function DelayShippingPage({ params }: DelayShippingPageParams) {
  const subscribeId = Number(params.subscribeId);
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <DelayShipping subscribeId={subscribeId} />
          <SubscriptionSkipDelivery subscribeId={subscribeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
