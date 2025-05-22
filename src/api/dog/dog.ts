import axiosInstance from "../axiosInstance";
import { AxiosInstance } from "axios";
import { DogDetailData, DogListData, FullDogDetail, UploadDogProfileImage } from "@/types";

const getDogList = async (instance: AxiosInstance = axiosInstance): Promise<DogListData[]> => {
  console.log('instance!!!!!!!!', instance)
  const { data } = await instance.get('/api/dogs');
  return data?._embedded?.queryDogsDtoList || [];
}

const updateRepresentativeDog = async (dogId: number) => {
  const { data } = await axiosInstance.put(`/api/dogs/${dogId}/representative`);
  return data;
}

const uploadDogProfileImage = async (formData: FormData): Promise<UploadDogProfileImage | null> => {
  const { data, status } = await axiosInstance.post(`/api/dogs/picture/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  console.log('uploadDogProfileImage data', data, status)

  if (status === 200 || status === 201) {
    return data;
  } else{
    return null;
  }
}

const updateDogProfileImage = async (dogId: number, dogPictureId: number | null) => {
  const { data } = await axiosInstance.put(`/api/dogs/${dogId}/picture`, { dogPictureId: dogPictureId });
  return data;
}

const updateDogInfo = async (dogId: number, body: DogDetailData): Promise<number> => {
  const { data } = await axiosInstance.put(`/api/dogs/${dogId}`, body);
  return data.oneMealRecommendGram;
}

const getDogDetail = async (dogId: number, instance: AxiosInstance = axiosInstance): Promise<DogDetailData> => {
  const { data } = await instance.get(`/api/dogs/${dogId}`);
  return data.dogDto;
}

const getFullDogList = async (instance: AxiosInstance = axiosInstance): Promise<FullDogDetail[]> => {
  const list = await getDogList(instance);
  if (!list.length) return [];

  const results = await Promise.allSettled(
    list.map((dog) => getDogDetail(dog.id, instance))
  );

  return results
    .map((result, index) => {
      if (result.status === 'fulfilled') {
        const base = list[index];
        const detail = result.value;

        // 병합: base → dogDto → detail, 중복은 마지막 값 우선
        const merged = {
          ...base,
          ...detail,
        };

        // ingredients, recipeDtoList는 이미 구조 분해에서 제거됨
        return merged;
      }
      return null;
    })
    .filter((item): item is FullDogDetail => item !== null);
};


export { getDogList, updateRepresentativeDog, uploadDogProfileImage, updateDogProfileImage, getDogDetail, getFullDogList, updateDogInfo }