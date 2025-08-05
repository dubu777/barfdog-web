import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import { PetListResponse } from "@/types/pet";

const getPetList = async (
  instance: AxiosInstance = axiosInstance
): Promise<PetListResponse> => {
  const { data } = await instance.get("/api/v2/pets");
  return data.data;
};

export { getPetList };
