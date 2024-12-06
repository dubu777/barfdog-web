import axiosInstance from "../axiosInstance";
import {
  OrderSheetResponse,
  PaymentBody,
  PlanDiscountResponse,
  SubscriptionByIdDto,
} from "@/types/subscription";


const getPlanDiscount = async (): Promise<PlanDiscountResponse> => {
  const {data} = await axiosInstance.get('/api/planDiscount');

  return data
}

const getOrderSheet = async (subscribeId: number): Promise<OrderSheetResponse> => {
  const {data} = await axiosInstance.get(`/api/orders/sheet/subscribe/${subscribeId}`);

  return data
}

const createSubscription = async (
  subscribeId: number,
  body: PaymentBody
): Promise<any> => {
  const response = await axiosInstance.put(`/api/subscribes/${subscribeId}`, body);
  return response;
};

const getSubscriptionById = async (subscribeId: number): Promise<SubscriptionByIdDto> => {
  const { data } = await axiosInstance.get(`/api/subscribes/${subscribeId}`);
  return data.subscribeDto;
}


export {getPlanDiscount, createSubscription, getOrderSheet, getSubscriptionById}