import { DogData } from "@/types";
import axiosInstance from "../axiosInstance";

const getDogList = async (): Promise<DogData[]> => {
  const { data } = await axiosInstance.get('/api/dogs');
  return data._embedded.queryDogsDtoList
}

const updateRepresentativeDog = async (dogId: number) => {
  const { data } = await axiosInstance.put(`/api/dogs/${dogId}/representative`);
  return data;
}

export { getDogList, updateRepresentativeDog }