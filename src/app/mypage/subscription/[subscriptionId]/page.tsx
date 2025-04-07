import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchSubscriptionAndDogDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import SubscriptionDetail from "@/components/pages/mypage/subscription/subscriptionDetail/SubscriptionDetail";

interface SubscriptionDetailPageProps {
  params: {
    subscriptionId: string;
  }
}

export default async function SubscriptionDetailPage({ params }: SubscriptionDetailPageProps) {
  const subscriptionId = Number(params.subscriptionId);
  const queryClient = new QueryClient();
  await prefetchSubscriptionAndDogDetail(queryClient, subscriptionId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionDetail subscriptionId={subscriptionId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}