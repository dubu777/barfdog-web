import axiosInstance from "@/api/axiosInstance";
import {RewardListData, RewardResponse} from "@/types/reward";

const getRewardList = async ({
  pageParam = 0,
  size = 5,
}: { pageParam: number; size: number }): Promise<RewardListData> => {
  const { data } = await axiosInstance.get<RewardResponse>(`/api/rewards`, {
    params: { page: pageParam, size },
  });
  const rewardList = data?.pagedModel?._embedded?.queryRewardsDtoList || []; 
  const totalReward = data?.reward || 0;
  const totalCount = data?.pagedModel?.page?.totalElements || 0;
  const page = data?.pagedModel?.page || { number: 0, totalPages: 1 };

  return {
    totalReward,
    rewardList,
    totalCount,
    page,
  };
};

// const applyCoupon = async (body: { code: string }) => {
//   const { data } = await axiosInstance.put('/api/coupons/code', body);
//   return data;
// }

export { getRewardList }