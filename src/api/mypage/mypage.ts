import axiosInstance from "@/api/axiosInstance";
import { MyPageInfoData, RewardListData, RewardResponse, SubscribeSkipType } from "@/types";

export { getMypageInfo, getCouponList, applyCoupon, getRewardList, skipSubscribe }

const getMypageInfo = async (): Promise<MyPageInfoData> => {
  const { data }: { data: MyPageInfoData } = await axiosInstance.get('/api/mypage');
  return data;
}

const getCouponList = async () => {
  const { data } = await axiosInstance.get('/api/coupons');
  return data;
}

const applyCoupon = async (body: { code: string }) => {
  const { data } = await axiosInstance.put('/api/coupons/code', body);
  console.log(data)
  return data;
}

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

const skipSubscribe = async (subscribeId: number, skipType: SubscribeSkipType) => {
  const body = {
    id: subscribeId,
    type: skipType
  }
  console.log('body', body)
  const { data } = await axiosInstance.post(`/api/subscribes/${subscribeId}/skip/week`, body);
  return data;
}



