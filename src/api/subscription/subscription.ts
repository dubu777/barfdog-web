import axiosInstance from "../axiosInstance";
import { OrderSheetResponse, PaymentBody, PlanDiscountResponse, SubscriptionData, SubscriptionResponse } from "@/types/subscription";


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



export {getPlanDiscount, createSubscription, getOrderSheet}