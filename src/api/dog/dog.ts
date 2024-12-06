
import { DogData } from "@/types";
import axiosInstance from "../axiosInstance";



const getDogs = async (): Promise<DogData[]> => {
  const {data} = await axiosInstance.get('/api/dogs');

  return data._embedded.queryDogsDtoList
}



                          
export { getDogs }