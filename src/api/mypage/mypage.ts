import axiosInstance from "@/api/axiosInstance";
import {
  Coupon,
  InviteRewardList,
  MyPageBannerData,
  MyPageInfoData,
  RewardListData,
  RewardListDataWithTotals,
  RewardResponse,
  PaymentItem,
} from "@/types";

export {
  getMyPageInfo,
  getMyPageBanner,
  getCouponList,
  applyCoupon,
  getRewardList,
  getInviteRewardList,
  applyRecommendCode,
  getPaymentList,
  deletePaymentMethod,
}

const getMyPageInfo = async (): Promise<MyPageInfoData> => {
  const { data }: { data: MyPageInfoData } = await axiosInstance.get('/api/mypage');
  return data;
}

const getCouponList = async (): Promise<Coupon[]> => {
  const { data } = await axiosInstance.get('/api/coupons');
  return data.couponsPageDto?._embedded?.queryCouponsDtoList || [];
}

const applyCoupon = async (code: string) => {
  const { data } = await axiosInstance.put('/api/coupons/code', { code });
  return data;
}

const getRewardList = async ({
  pageParam = 0,
  size = 5,
}: { pageParam: number; size: number }): Promise<RewardListData | RewardListDataWithTotals> => {
  const { data } = await axiosInstance.get<RewardResponse>(`/api/rewards`, {
    params: { page: pageParam, size },
  });

  const rewardList = data?.pagedModel?._embedded?.queryRewardsDtoList || [];
  const totalReward = data?.reward || 0;
  const totalCount = data?.pagedModel?.page?.totalElements || 0;
  const page = data?.pagedModel?.page || { number: 0, totalPages: 1 };

  if(pageParam === 0) {
      return {
      totalReward,
      rewardList,
      totalCount,
      page,
    }
  }
  return {
    rewardList,
    page,
  }
};

const getMyPageBanner = async (): Promise<MyPageBannerData> => {
  const { data } = await axiosInstance.get('/api/banners/myPage');
  const { id, name, status, filenamePc, filenameMobile, pcLinkUrl, mobileLinkUrl, _links } = data;

  return {
    id,
    name,
    status,
    filenamePc,
    filenameMobile,
    pcLinkUrl,
    mobileLinkUrl,
    imageUrl: {
      pc: _links?.thumbnail_pc?.href,
      mobile: _links?.thumbnail_mobile?.href,
    },
  };
}

const getInviteRewardList = async (page = 0, size = 10): Promise<InviteRewardList> => {
  const { data } = await axiosInstance.get(`/api/rewards/invite?page=${page}&size=${size}`);
  const { recommend, joinedCount, orderedCount, totalRewards, pagedModel } = data;
  console.log(data)
  return {
    recommend,
    joinedCount,
    orderedCount,
    totalRewards,
    rewardList: pagedModel?._embedded?.queryRewardsDtoList || [],
    page: pagedModel?.page,
  };
}

const applyRecommendCode = async (body: { recommendCode: string }) => {
  const { data } = await axiosInstance.put('/api/rewards/recommend', body);
  return data;
}

const getPaymentList = async (): Promise<PaymentItem[]> => {
  const { data } = await axiosInstance.get('/api/cards');
  return data._embedded?.querySubscribeCardsDtoList || [];
}

const deletePaymentMethod = async (cardId: number) => {
  const { data } = await axiosInstance.delete(`/api/cards/${cardId}`);
  return data;
}
