//

import { AddressResponse, OrderSheetResponse } from "@/types";
import axiosInstance from "../axiosInstance";


const getOrderSheet = async (subscribeId: number): Promise<OrderSheetResponse> => {
  const {data} = await axiosInstance.get(`/api/orders/sheet/subscribe/${subscribeId}`);

  return data
}

const getAddress = async (): Promise<AddressResponse> => {
  const {data} = await axiosInstance.get(`/api/address`);

  return data._embedded.addressResponseDtoList
}

export {getOrderSheet, getAddress}