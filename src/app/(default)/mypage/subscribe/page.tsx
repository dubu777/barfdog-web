import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetSubscribeList } from "@/api/subscription/queries/useGetSubscribeList";
import ManageSubscribe from "@/components/pages/mypage/subscribe/ManageSubscribe";

export default async function ManageSubscriptionPage() {
  const queryClient = new QueryClient();
  await prefetchGetSubscribeList(queryClient, 0);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>구독중인 데이터가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ManageSubscribe />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
