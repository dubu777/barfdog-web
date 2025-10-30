import axiosInstance from "../axiosInstance";
import {
  PaymentBody,
  PlanDiscountResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  SubscriptionDetail,
  SubscriptionInfoResponse,
  SubscriptionOrderSheet,
} from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { AxiosInstance } from "axios";

const getPlanDiscount = async (): Promise<PlanDiscountResponse[]> => {
  const { data } = await axiosInstance.get("/api/planDiscount");

  return data._embedded.planDiscountResponseDtoList || [];
};

export interface RequestCreateSubscription {
  subscribeId: number;
  body: PaymentBody;
}

const getRawFoodOrderSheet = async (
  surveyId: number,
  instance: AxiosInstance = axiosInstance
): Promise<any> => {
  const { data } = await instance.get(
    `/api/v2/orders/raw/sheet/subscription/${surveyId}`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "생식 주문서 조회에 실패했습니다";
  throw new Error(message);
};

// 구독 정보 변경 - 구독 상세 조회 v2
const getSubscriptionDetailV2 = async (
  surveyId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionDetail> => {
  const { data } = await instance.get(
    `/api/v2/orders/subscription/${surveyId}`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "구독 상세 조회에 실패했습니다";
  throw new Error(message);
};

// 구독 정보 변경 요청
const updateSubscriptionV2 = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: CreateSubscriptionRequest;
}): Promise<CreateSubscriptionResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/subscription/order/${orderId}`,
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "구독 정보 변경에 실패했습니다";
  throw new Error(message);
};

// 구독 주문서 - 생식 상세
const getRawFoodDetail = async (
  recipeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<any> => {
  const { data } = await instance.get(
    `/api/v2/orders/sheet/subscription/recipes/${recipeId}`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "생식 상세 조회에 실패했습니다";
  throw new Error(message);
};

// 구독 주문서 - 구독 생성
const createSubscription = async ({
  surveyId,
  body,
}: {
  surveyId: number;
  body: CreateSubscriptionRequest;
}): Promise<CreateSubscriptionResponse> => {
  const { data } = await axiosInstance.post(
    `api/v2/orders/payment/sheet/subscription/${surveyId}`,
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "구독 생성에 실패했습니다";
  throw new Error(message);
};

const getSubscriptionInfo = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionInfoResponse> => {
  const { data } = await instance.get(`/api/v2/user/subscribes/${subscribeId}`);
  return validateApiResponse(data, "구독 정보 조회에 실패했습니다.");
};

const getSubscriptionOrderSheet = async (
  surveyId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionOrderSheet> => {
  const { data } = await instance.get(
    `/api/v2/user/recipes/with-recommendation?recipeSurveyId=${surveyId}`
  );
  return validateApiResponse(data, "구독 주문서 조회에 실패했습니다.");
};

export {
  getPlanDiscount,
  getRawFoodOrderSheet,
  createSubscription,
  getRawFoodDetail,
  getSubscriptionDetailV2,
  updateSubscriptionV2,
  getSubscriptionInfo,
  getSubscriptionOrderSheet,
};
