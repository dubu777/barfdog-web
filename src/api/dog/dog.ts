import axiosInstance from "../axiosInstance";
import { AxiosInstance } from "axios";
import { DogDetailData } from "@/types";

const getDogDetail = async (
  dogId: number,
  instance: AxiosInstance = axiosInstance
): Promise<DogDetailData> => {
  const { data } = await instance.get(`/api/dogs/${dogId}`);
  return data.dogDto;
};

export { getDogDetail };
