import axiosInstance from "../axiosInstance";
import { OrderSheetResponse, PaymentBody, PlanDiscountResponse, SubscriptionData, SubscriptionResponse } from "@/types/subscription";


const getPlanDiscount = async (): Promise<PlanDiscountResponse> => {
  const {data} = await axiosInstance.get('/api/planDiscount');

  return data
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


export {getPlanDiscount, updateSubscription}