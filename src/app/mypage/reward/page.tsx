import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import RewardList from "@/components/pages/mypage/reward/list/RewardList";
import { prefetchGetInfiniteRewardList } from "@/api/mypage/reward/queries/prefetchGetInfiniteRewardList";

export default async function RewardPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteRewardList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>사용 가능한 적립금이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <RewardList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
