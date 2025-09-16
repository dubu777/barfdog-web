import axiosInstance from "../axiosInstance";
import { SubscriptionOrderDto, OrderType } from "@/types";
import {
  GeneralOrderData,
  MergeOrderAndRecipe,
  SubscriptionOrderData,
} from "@/types";
import { AxiosInstance } from "axios";

// SubscribeOrderDto 타입이 정의되어 있지 않음
const getSubscriptionOrderList = async (
  page: number,
  size: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionOrderData[]> => {
  const { data } = await instance.get(
    `/api/orders/subscribe?page=${page}&size=${size}`
  );
  return (
    data._embedded?.querySubscribeOrdersDtoList.map(
      ({
        subscribeOrderDto,
        ...rest
      }: {
        subscribeOrderDto: SubscriptionOrderDto;
      }) => ({
        orderDto: subscribeOrderDto,
        ...rest,
      })
    ) || []
  );
};

const getGeneralOrderList = async (
  page: number,
  size: number,
  instance: AxiosInstance = axiosInstance
): Promise<GeneralOrderData[]> => {
  const { data } = await instance.get(
    `/api/orders/general?page=${page}&size=${size}`
  );
  return data._embedded?.queryGeneralOrdersDtoList || [];
};

const getOrderDetail = async (
  orderId: number,
  type: OrderType,
  instance: AxiosInstance = axiosInstance
): Promise<MergeOrderAndRecipe> => {
  const { data } = await instance.get(
    `/api/orders/${orderId}/${type.toLowerCase()}`
  );

  const mergeOrderAndRecipe: MergeOrderAndRecipe = {
    ...data,
    orderItemDtoList: data.orderItemDtoList ? [...data.orderItemDtoList] : [],
    orderDto: {
      ...data.orderDto,
      ...data.recipeDto,
    },
    recipeDto: undefined,
  };

  return mergeOrderAndRecipe || null;
};

export { getOrderDetail, getSubscriptionOrderList, getGeneralOrderList };
