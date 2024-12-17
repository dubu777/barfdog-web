import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetRewardList } from "@/api/mypage/queries/useGetRewardList";
import Reward from "@/components/pages/mypage/reward/Reward";

export default async function RewardPage() {
  const queryClient = new QueryClient();
  await prefetchGetRewardList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>사용 가능한 적립금이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Reward />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
