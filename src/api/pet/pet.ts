import { DogData } from "@/types";
import axiosInstance from "../axiosInstance";

const getDogList = async (): Promise<DogData[]> => {
  const { data } = await axiosInstance.get('/api/dogs');
  return data?._embedded?.queryDogsDtoList || [];
}

const updateRepresentativeDog = async (dogId: number) => {
  const { data } = await axiosInstance.put(`/api/dogs/${dogId}/representative`);
  return data;
}

const uploadDogProfileImage = async (formData: FormData) => {
  const { data, status } = await axiosInstance.post(`/api/dogs/picture/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  console.log('uploadDogProfileImage data', data, status)

  if (status === 200 || status === 201) {
    return data;
  }
}

const updateDogProfileImage = async (dogId: number, dogPictureId: number) => {
  const { data } = await axiosInstance.put(`/api/dogs/${dogId}/picture`, { dogPictureId: dogPictureId });
  return data;
}

export { getDogList, updateRepresentativeDog, uploadDogProfileImage, updateDogProfileImage }