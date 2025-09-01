import axiosInstance from "@/api/axiosInstance";
import { PaymentItem } from "@/types";
import { AxiosInstance } from "axios";

const getPaymentList = async (instance: AxiosInstance = axiosInstance): Promise<PaymentItem[]> => {
  const { data } = await instance.get('/api/cards');
  return data._embedded?.querySubscribeCardsDtoList || [];
}

const deletePaymentMethod = async (cardId: number) => {
  const { data } = await axiosInstance.delete(`/api/cards/${cardId}`);
  return data;
}

export {
  getPaymentList,
  deletePaymentMethod,
}