import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import {
  Pet,
  PetBreedList,
  PetId,
  PetListResponse,
  UpdatePetRequest,
} from "@/types/pet";
import { ApiResponse } from "@/types";

const getPetList = async (
  instance: AxiosInstance = axiosInstance
): Promise<PetListResponse> => {
  const { data } = await instance.get("/api/v2/pets");
  return data.data.petList;
};
const getPetBreedList = async (
  instance: AxiosInstance = axiosInstance
): Promise<PetBreedList> => {
  const { data } = await instance.get("/api/v2/pets/breeds/selectable");
  return data.data.petBreedList;
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

const makePetFormData = (body: object, petPicture: File | null): FormData => {
  const formData = new FormData();
  formData.append(
    "petInfo",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  formData.append(
    "petPicture",
    petPicture ?? new Blob([], { type: "application/octet-stream" })
  );
  return formData;
};

const updatePet = async ({
  petId,
  body,
  petPicture,
}: {
  petId: number;
  body: UpdatePetRequest;
  petPicture: File | null;
}): Promise<ApiResponse<PetId>> => {
  const formData = makePetFormData(body, petPicture);

  const { data } = await axiosInstance.put(`/api/v2/pets/${petId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const createPet = async ({
  body,
  petPicture,
}: {
  body: UpdatePetRequest;
  petPicture: File | null;
}): Promise<ApiResponse<PetId>> => {
  const formData = makePetFormData(body, petPicture);

  const { data } = await axiosInstance.post("/api/v2/pets", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  getPetBreedList,
  makePetFormData,
};
