import axiosInstance from "@/api/axiosInstance";
import Rewards from "@/components/pages/mypage/rewards/Rewards";

export default async function RewardPage() {
  const rewardsResponse = await axiosInstance.get('/api/rewards?page=0&size=1000');
  const rewardsData = {
    totalReward: rewardsResponse.data.reward,
    rewardList: rewardsResponse.data.pagedModel._embedded.queryRewardsDtoList,
    totalCount: rewardsResponse.data.pagedModel.page.totalElements,
  }
  return (
    <Rewards rewardsData={rewardsData} />
  )
}
