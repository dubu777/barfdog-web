import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetInfiniteSubscriptionList } from "@/api/mypage/subscription/queries/prefetchGetInfiniteSubscriptionList";
import Spinner from "@/components/ui/spinner/Spinner";
import SubscriptionList from "@/components/pages/mypage/subscription/list/SubscriptionList";

export default async function ManageSubscriptionPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteSubscriptionList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>구독중인 데이터가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
