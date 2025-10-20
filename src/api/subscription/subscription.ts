import axiosInstance from "../axiosInstance";
import {
  PaymentBody,
  PlanDiscountResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  SubscriptionDetail,
} from "@/types";
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
  reportId: number,
  instance: AxiosInstance = axiosInstance
): Promise<any> => {
  const { data } = await instance.get(
    `/api/v2/orders/raw/sheet/subscription/${reportId}`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "생식 주문서 조회에 실패했습니다";
  throw new Error(message);
};

// 구독 정보 변경 - 구독 상세 조회 v2
const getSubscriptionDetailV2 = async (
  reportId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionDetail> => {
  const { data } = await instance.get(
    `/api/v2/orders/subscription/${reportId}`
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
  reportId,
  body,
}: {
  reportId: number;
  body: CreateSubscriptionRequest;
}): Promise<CreateSubscriptionResponse> => {
  const { data } = await axiosInstance.post(
    `api/v2/orders/payment/sheet/subscription/${reportId}`,
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "구독 생성에 실패했습니다";
  throw new Error(message);
};

export {
  getPlanDiscount,
  getRawFoodOrderSheet,
  createSubscription,
  getRawFoodDetail,
  getSubscriptionDetailV2,
  updateSubscriptionV2,
};
