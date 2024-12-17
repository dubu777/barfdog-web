import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetSubscriptionBenefits } from "@/api/subscription/queries/useGetSubscriptionBenefits";
import SubscriptionBenefit from "@/components/pages/mypage/subscriptionBenefit/SubscriptionBenefit";

interface SubscriptionBenefitPageParams {
  params: {
    subscribeId: string;
  }
}

export default async function SubscriptionBenefitPage({ params }: SubscriptionBenefitPageParams) {
  const { subscribeId } = params;
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionBenefits(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페키지 혜택 데이터가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionBenefit subscribeId={subscribeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}