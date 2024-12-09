import axiosInstance from "../axiosInstance";
import {
  BenefitDto,
  OrderSheetResponse,
  PaymentBody,
  PlanDiscountResponse, SubscribeAddressData, SubscribeListData,
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

const getSubscriptionById = async (subscribeId: string): Promise<SubscriptionByIdDto> => {
  const { data } = await axiosInstance.get(`/api/subscribes/${subscribeId}`);
  return data.subscribeDto;
}

const getSubscribeList = async (page = 0, size = 999): Promise<SubscribeListData[]> => {
  const { data } = await axiosInstance.get(`/api/subscribes?page=${page}&size=${size}`);
  return data._embedded.querySubscribesDtoList;
};

const getPackageBenefits = async (subscribeId: string): Promise<BenefitDto[]> => {
  const { data } = await axiosInstance.get(`/api/subscribes/benefits/${subscribeId}`);
  return data._embedded.subscribeBenefitDtoList;
}

const getDeliveryAddress = async (subscribeId: string): Promise<SubscribeAddressData> => {
  const { data } = await axiosInstance.get(`/api/address/subscribe/${subscribeId}`);
  return data;
}

export {
  getPlanDiscount,
  createSubscription,
  getOrderSheet,
  getSubscriptionById,
  getPackageBenefits,
  getSubscribeList,
  getDeliveryAddress,
}