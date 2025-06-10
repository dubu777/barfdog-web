import axiosInstance from "../axiosInstance";
import {
  BenefitDto,
  PaymentBody,
  PlanDiscountResponse, SubscriptionAddressData, SubscriptionListData,
  SubscriptionDetailDto, SubscriptionSkipType, AddressDto, UsingCoupon
} from "@/types";
import { AxiosInstance } from "axios";

const getPlanDiscount = async (): Promise<PlanDiscountResponse[]> => {
  const {data} = await axiosInstance.get('/api/planDiscount');

  return data._embedded.planDiscountResponseDtoList || []
}

export interface RequestCreateSubscription {
  subscribeId: number,
  body: PaymentBody
}

const updateSubscription = async ({
  subscribeId,
  body
}: RequestCreateSubscription): Promise<any> => {
  const response = await axiosInstance.put(`/api/subscribes/${subscribeId}`, body);
  return response;
};

const getSubscriptionDetail = async (subscribeId: number, instance: AxiosInstance = axiosInstance): Promise<SubscriptionDetailDto> => {
  const { data } = await instance.get(`/api/subscribes/${subscribeId}`);
  const matchedRecipes = data?.subscribeRecipeDtoList.map(recipe => {
    const matchedRecipe = data?.recipeDtoList.find(r => r.id === recipe.recipeId);
    return {
      recipeId: recipe.recipeId,
      recipeNames: recipe.recipeName,
      imageUrl: matchedRecipe?.imgUrl ?? null,
    };
  });
  return {
    ...(({ subscribeStatus, ...rest }) => ({ ...rest, status: subscribeStatus }))(data.subscribeDto),
    recipeList: matchedRecipes,
  };
}

const getSubscriptionList = async (page = 0, size = 50, instance: AxiosInstance = axiosInstance): Promise<SubscriptionListData[]> => {
  const { data } = await instance.get(`/api/subscribes?page=${page}&size=${size}`);
  return data?._embedded?.querySubscribesDtoList || [];
};

const getSubscriptionBenefits = async (subscribeId: string): Promise<BenefitDto[]> => {
  const { data } = await axiosInstance.get(`/api/subscribes/benefits/${subscribeId}`);
  return data._embedded.subscribeBenefitDtoList;
}

const getSubscriptionAddress = async (subscribeId: number, instance: AxiosInstance = axiosInstance): Promise<SubscriptionAddressData> => {
  const { data } = await instance.get(`/api/address/subscribe/${subscribeId}`);
  return data;
}

const skipSubscription = async (subscribeId: number, skipType: SubscriptionSkipType) => {
  const body = {
    id: subscribeId,
    type: skipType
  }
  const { data } = await axiosInstance.post(`/api/subscribes/${subscribeId}/skip/week`, body);
  return data;
}

const updateSubscriptionAddress = async (subscribeId: number, changeType: string, body: AddressDto) => {
  const { data } = await axiosInstance.post(`/api/address/subscribe/${subscribeId}/${changeType}`, body);
  return data;
}

const cancelUsedCoupon = async (subscriptionId: number, usingCouponId: number) => {
  const { data } = await axiosInstance.put(`/api/subscribes/${subscriptionId}/coupon/cancel`, { memberCouponId: usingCouponId });
  return { ...data, subscriptionId: subscriptionId };
}

const updateUsingCoupon = async (subscriptionId: number, body: UsingCoupon) => {
  const { data } = await axiosInstance.post(`/api/subscribes/${subscriptionId}/coupon`, body);
  return { ...data, subscriptionId: subscriptionId };
}

export {
  getPlanDiscount,
  getSubscriptionDetail,
  getSubscriptionBenefits,
  getSubscriptionList,
  getSubscriptionAddress,
  updateSubscription,
  skipSubscription,
  updateSubscriptionAddress,
  cancelUsedCoupon,
  updateUsingCoupon,
}
