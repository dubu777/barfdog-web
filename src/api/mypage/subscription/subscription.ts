import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { VISIBLE_SUBSCRIPTION_STATUS_LIST } from "@/constants/mypage/subscription";
import { SubscriptionStatus } from "@/types";
import { SubscriptionDetail, SubscriptionList } from "@/types/mypage/subscription";

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
    page: data.page,
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

export {
  getSubscriptionList,
  getSubscriptionDetail,
}