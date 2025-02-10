import axiosInstance from "../axiosInstance";
import {
  BenefitDto,
  PaymentBody,
  PlanDiscountResponse, SubscriptionAddressData, SubscriptionListData,
  SubscriptionDetailDto, SubscriptionSkipType, AddressDto,
} from "@/types/subscription";


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

const getSubscriptionDetail = async (subscribeId: string): Promise<SubscriptionDetailDto> => {
  const { data } = await axiosInstance.get(`/api/subscribes/${subscribeId}`);
  return data.subscribeDto;
}

const getSubscriptionList = async (page = 0, size = 999): Promise<SubscriptionListData[]> => {
  const { data } = await axiosInstance.get(`/api/subscribes?page=${page}&size=${size}`);
  return data._embedded.querySubscribesDtoList;
};

const getSubscriptionBenefits = async (subscribeId: string): Promise<BenefitDto[]> => {
  const { data } = await axiosInstance.get(`/api/subscribes/benefits/${subscribeId}`);
  return data._embedded.subscribeBenefitDtoList;
}

const getSubscriptionAddress = async (subscribeId: number): Promise<SubscriptionAddressData> => {
  const { data } = await axiosInstance.get(`/api/address/subscribe/${subscribeId}`);
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

export {
  getPlanDiscount,
  getSubscriptionDetail,
  getSubscriptionBenefits,
  getSubscriptionList,
  getSubscriptionAddress,
  updateSubscription,
  skipSubscription,
  updateSubscriptionAddress,
}
