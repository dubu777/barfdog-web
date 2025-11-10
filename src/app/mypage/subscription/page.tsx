import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import SubscriptionList from "@/components/pages/mypage/subscription/list/SubscriptionList";
import Error from "@/components/layout/error/Error";
import { prefetchGetInfiniteSubscriptionList } from "@/api/mypage/subscription/queries/prefetchGetInfiniteSubscriptionList";

export default async function ManageSubscriptionPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteSubscriptionList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
