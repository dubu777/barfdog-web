import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { VISIBLE_SUBSCRIPTION_STATUS_LIST } from "@/constants/mypage/subscription";
import { SubscriptionStatus } from "@/types";
import { ApplyNextPaymentCouponProps, SubscriptionDetail, SubscriptionList } from "@/types/mypage/subscription";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const isVisibleSubscribeStatus = (status: SubscriptionStatus): boolean => {
  return VISIBLE_SUBSCRIPTION_STATUS_LIST.includes(status);
};

const getSubscriptionList = async (
  page = 0,
  size = 50,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionList> => {
  const { data } = await instance.get(
    `/api/subscribes?page=${page}&size=${size}`
  );
  const subscriptionList = data?._embedded?.querySubscribesDtoList
    ?.map(item => {
      const { subscribeDto, recipeNames } = item;
      return {
        ...subscribeDto,
        recipeNames,
      }
    })
    .filter(item => isVisibleSubscribeStatus(item.status)) ?? [];
  return {
    subscriptionList,
    pagination: data.page,
  } ;
};

const getSubscriptionDetail = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionDetail> => {
  const { data } = await instance.get(`/api/subscribes/${subscribeId}`);
  const matchedRecipes = data?.subscribeRecipeDtoList.map((recipe) => {
    const matchedRecipe = data?.recipeDtoList.find(
      (r) => r.id === recipe.recipeId
    );
    return matchedRecipe;
  });
  return {
    subscriptionInfo: data.subscribeDto,
    subscriptionRecipeInfo: matchedRecipes,
    memberCouponInfo: data.memberCouponDtoList,
  };
};

// DELETE 예정
const getPaymentList = async (instance: AxiosInstance = axiosInstance)=> {
  const { data } = await instance.get('/api/cards');
  return data._embedded?.querySubscribeCardsDtoList || [];
}

const applyNextPaymentCoupon = async (subscribeId: number, body: ApplyNextPaymentCouponProps) => {
  const { data } = await axiosInstance.post(`/api/subscribes/${subscribeId}/coupon`, body);
  return validateApiResponse(data, '다음 회차 쿠폰 적용에 실패했습니다.');
}

const cancelAppliedNextPaymentCoupon = async (subscribeId: number, body: ApplyNextPaymentCouponProps) => {
  const { data } = await axiosInstance.put(`/api/subscribes/${subscribeId}/coupon/cancel`, body);
  return validateApiResponse(data, '다음 회차 쿠폰 적용 취소에 실패했습니다.');
}

export {
  getSubscriptionList,
  getSubscriptionDetail,
  getPaymentList,
  applyNextPaymentCoupon,
  cancelAppliedNextPaymentCoupon,
}