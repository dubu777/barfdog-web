import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@/components/common/spinner/Spinner";
import SubscriptionDetail from "@/components/pages/mypage/subscription/detail/SubscriptionDetail";
import { prefetchGetSubscriptionDetail } from "@/api/mypage/subscription/queries/prefetchGetSubscriptionDetail";

interface SubscriptionDetailPageProps {
  params: {
    subscriptionId: string;
  }
}

export default async function SubscriptionDetailPage({ params }: SubscriptionDetailPageProps) {
  const { subscriptionId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, Number(subscriptionId));
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionDetail subscriptionId={Number(subscriptionId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}