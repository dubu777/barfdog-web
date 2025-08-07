import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import { Pet, PetId, PetListResponse, UpdatePetRequest } from "@/types/pet";
import { ApiResponse } from "@/types";

const getPetList = async (
  instance: AxiosInstance = axiosInstance
): Promise<PetListResponse> => {
  const { data } = await instance.get("/api/v2/pets");
  return data.data;
};

const checkDuplicatePetName = async (
  petName: string
): Promise<ApiResponse<string>> => {
  const { data } = await axiosInstance.get(
    `/api/v2/pets/check-name?petName=${petName}`
  );
  return data;
};

const getPetDetail = async (
  petId: number,
  instance: AxiosInstance = axiosInstance
): Promise<Pet> => {
  const { data } = await instance.get(`/api/v2/pets/${petId}`);
  return data.data;
};

const updatePet = async ({
  petId,
  body,
}: {
  petId: number;
  body: UpdatePetRequest;
}): Promise<ApiResponse<PetId>> => {
  const { data } = await axiosInstance.put(`/api/v2/pets/${petId}`, body);
  return data;
};

const createPet = async (
  body: UpdatePetRequest
): Promise<ApiResponse<PetId>> => {
  const { data } = await axiosInstance.put("/api/v2/pets", body);
  return data;
};

const deletePet = async (petId: number): Promise<ApiResponse<PetId>> => {
  const { data } = await axiosInstance.delete(`/api/v2/pets/${petId}`);
  return data;
};

const updateRepresentativePet = async (
  petId: number
): Promise<ApiResponse<PetId>> => {
  const { data } = await axiosInstance.put(
    `/api/v2/pets/${petId}/representative`
  );
  return data;
};

export {
  getPetList,
  checkDuplicatePetName,
  getPetDetail,
  deletePet,
  updateRepresentativePet,
  updatePet,
  createPet,
};
