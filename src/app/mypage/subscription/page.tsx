import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetSubscriptionList } from "@/api/subscription/queries/usePrefetchGetSubscriptionList";
import ManageSubscription from "@/components/pages/mypage/subscription/manageSubscription/ManageSubscription";

export default async function ManageSubscriptionPage() {
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionList(queryClient, 0, 999);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>구독중인 데이터가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ManageSubscription />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
