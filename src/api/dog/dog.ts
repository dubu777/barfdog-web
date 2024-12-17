import { DogData } from "@/types";
import axiosInstance from "../axiosInstance";

const getDogList = async (): Promise<DogData[]> => {
  const {data} = await axiosInstance.get('/api/dogs');
  return data._embedded.queryDogsDtoList
}

export { getDogList }