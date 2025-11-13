import axiosInstance from "../axiosInstance";
import {
  PaymentBody,
  PlanDiscountResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  SubscriptionInfoResponse,
  SubscriptionOrderSheet,
  UpdateSubscriptionRequest,
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

// 구독 주문서 - 구독 생성
const createSubscription = async ({
  body,
}: {
  body: CreateSubscriptionRequest;
}): Promise<CreateSubscriptionResponse> => {
  const { data } = await axiosInstance.post(`/api/v2/user/subscribes`, body);
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "구독 생성에 실패했습니다";
  throw new Error(message);
};

// 현재 구독 정보 조회 - 구독 변경 페이지
const getSubscriptionInfo = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionInfoResponse> => {
  const { data } = await instance.get(`/api/v2/user/subscribes/${subscribeId}`);
  return validateApiResponse(data, "구독 정보 조회에 실패했습니다.");
};

// 추천 레시피 정보가 포함된 레시피 정보 조회
const getSubscriptionOrderSheet = async (
  surveyId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionOrderSheet> => {
  const { data } = await instance.get(
    `/api/v2/user/recipes/with-recommendation?recipeSurveyId=${surveyId}`
  );
  return validateApiResponse(data, "구독 주문서 조회에 실패했습니다.");
};

// 구독 정보 변경 요청
const updateSubscription = async ({
  subscribeId,
  body,
}: {
  subscribeId: number;
  body: UpdateSubscriptionRequest;
}): Promise<CreateSubscriptionResponse> => {
  const { data } = await axiosInstance.put(
    `/api/v2/user/subscribes/${subscribeId}`,
    body
  );
  return validateApiResponse(data, "구독 정보 변경에 실패했습니다.");
};

export {
  getPlanDiscount,
  getRawFoodOrderSheet,
  createSubscription,
  updateSubscription,
  getSubscriptionInfo,
  getSubscriptionOrderSheet,
};
