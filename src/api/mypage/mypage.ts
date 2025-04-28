import axiosInstance from "@/api/axiosInstance";
import {
  Coupon,
  InviteRewardList,
  MyPageBannerData,
  MyPageInfoData,
  RewardListData,
  RewardListDataWithTotals,
  RewardResponse,
  PaymentItem, SendMessage,
  InviteRewardResponse,
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
  sendRecommendCodeMessage,
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

const getInviteRewardList = async ({
  pageParam = 0,
  size = 5,
}: { pageParam: number; size: number }): Promise<InviteRewardList> => {
  const { data } = await axiosInstance.get<InviteRewardResponse>(`/api/rewards/invite`, {
    params: { page: pageParam, size },
  });
  const { recommend, joinedCount, orderedCount, totalRewards, pagedModel } = data;
  console.log('data', data)
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

const sendRecommendCodeMessage = async (body: SendMessage) => {
  try {
    const { data } = await axiosInstance.post('/api/mypage/inviteSms', body);
    console.log(data);
    let message;
    const smsStatus = data.responseCode;
    switch (smsStatus) {
      case 200:
        message = '친구에게 메시지를 성공적으로 전송했습니다.';
        break;
      case 100:
        message = '전송자의 번호가 유효하지 않습니다.';
        break;
      case 101:
        message = '전송 시 유효성 검사 실패';
        break;
      case 102:
        message = '수신자의 번호가 유효하지 않습니다.';
        break;
      case 104:
        message = '받는 사람이 없습니다.';
        break;
      case 106:
        message = '메시지 유효성검사에 실패하였습니다.';
        break;
      case 201:
        message = '분당 300회 이상 API 호출을 할 수 없습니다.';
        break;
      case 205:
        message = '문자전송 잔액부족. 관리자에게 문의하세요.';
        break;
      default:
        message = '메시지를 전송할 수 없습니다. 관리자에게 문의하세요.';
        break;
    }
    return message;
  } catch (err) {
    console.log(err);
    return err;
  }

}