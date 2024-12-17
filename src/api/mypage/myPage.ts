import axiosInstance from "@/api/axiosInstance";
import { CouponData, MyPageBannerData, MyPageInfoData, RewardListData, RewardListDataWithTotals, RewardResponse } from "@/types";

export { getMyPageInfo, getMyPageBanner, getCouponList, applyCoupon, getRewardList }

const getMyPageInfo = async (): Promise<MyPageInfoData> => {
  const { data }: { data: MyPageInfoData } = await axiosInstance.get('/api/mypage');
  return data;
}

const getCouponList = async (): Promise<CouponData[]> => {
  const { data } = await axiosInstance.get('/api/coupons');
  return data.couponsPageDto._embedded.queryCouponsDtoList;
}

const applyCoupon = async (body: { code: string }) => {
  const { data } = await axiosInstance.put('/api/coupons/code', body);
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



