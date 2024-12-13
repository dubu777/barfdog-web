//

import { AddressResponse, OrderSheetResponse } from "@/types";
import axiosInstance from "../axiosInstance";

import {GeneralOrderData, MergeOrderAndRecipe, SubscribeOrderData, SubscribeOrderDto} from "@/types";

const getOrderSheet = async (subscribeId: number): Promise<OrderSheetResponse> => {
  const {data} = await axiosInstance.get(`/api/orders/sheet/subscribe/${subscribeId}`);

  return data
}

const getAddress = async (): Promise<AddressResponse> => {
  const {data} = await axiosInstance.get(`/api/address`);

  return data._embedded.addressResponseDtoList
}


export { getOrderDetail, getSubscribeOrderList, getGeneralOrderList, getOrderSheet, getAddress };

const getSubscribeOrderList = async (page: number, size: number): Promise<SubscribeOrderData[]> => {
  const { data } = await axiosInstance.get(`/api/orders/subscribe?page=${page}&size=${size}`);
  return (
    data._embedded?.querySubscribeOrdersDtoList.map(({ subscribeOrderDto, ...rest }: { subscribeOrderDto: SubscribeOrderDto }) => ({
      orderDto: subscribeOrderDto,
      ...rest,
    })) || []
  );
}

const getGeneralOrderList = async (page: number, size: number): Promise<GeneralOrderData[]> => {
  const { data } = await axiosInstance.get(`/api/orders/general?page=${page}&size=${size}`);
  return data._embedded?.queryGeneralOrdersDtoList || [];
}

const getOrderDetail = async (orderId: string, type: string): Promise<MergeOrderAndRecipe> => {
  const { data } = await axiosInstance.get(`/api/orders/${orderId}/${type}`);
  const mergeOrderAndRecipe: MergeOrderAndRecipe = {
      ...data,
      orderItemDtoList: data.orderItemDtoList ? [...data.orderItemDtoList] : [],
      orderDto: {
        ...data.orderDto,
        ...data.recipeDto
      },
      recipeDto: undefined
  }

  return mergeOrderAndRecipe || null;
}
