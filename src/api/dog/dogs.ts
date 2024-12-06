import axiosInstance from "@/api/axiosInstance";
import {DogData} from "@/types/dogs";

interface GetDogsResponse {
  _embedded: {
    queryDogsDtoList: DogData[]
  }
}

const getDogs = async (): Promise<DogData[]> => {
  const { data }: { data: GetDogsResponse } = await axiosInstance.get('/api/dogs');
  return data._embedded.queryDogsDtoList;
}

export { getDogs }