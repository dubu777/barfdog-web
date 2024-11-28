import Rewards from "@/components/pages/mypage/rewards/Rewards";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import {prefetchGetRewards} from "@/api/queries/useGetRewards";

export default async function RewardPage() {
  // const rewardsData = {
  //   totalReward: rewardsResponse.data.reward,
  //   rewardList: rewardsResponse.data.pagedModel._embedded.queryRewardsDtoList,
  //   totalCount: rewardsResponse.data.pagedModel.page.totalElements,
  // }
  const queryClient = new QueryClient();
  await prefetchGetRewards(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>사용 가능한 적립금이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Rewards />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
