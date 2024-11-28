import axiosInstance from "@/api/axiosInstance";
import {SubscribeByIdDto, SubscribeSkipType} from "@/types/subscription";

const getSubscribeById = async (subscribeId: number): Promise<SubscribeByIdDto> => {
  const { data } = await axiosInstance.get(`/api/subscribes/${subscribeId}`);
  return data.subscribeDto;
}

const skipSubscribe = async (subscribeId: number, skipType: SubscribeSkipType) => {
  const body = {
    id: subscribeId,
    type: skipType
  }
  console.log('body', body)
  const { data } = await axiosInstance.post(`/api/subscribes/${subscribeId}/skip/week`, body);
  return data;
}

export { getSubscribeById, skipSubscribe }