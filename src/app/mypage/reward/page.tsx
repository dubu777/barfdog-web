import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import RewardList from "@/components/pages/mypage/reward/list/RewardList";
import Error from "@/components/layout/error/Error";
import Spinner from "@/components/ui/spinner/Spinner";
import { prefetchGetInfiniteRewardList } from "@/api/mypage/reward/queries/prefetchGetInfiniteRewardList";

export default async function RewardPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteRewardList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <RewardList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
