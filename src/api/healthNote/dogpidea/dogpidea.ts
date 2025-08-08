import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import { BreedDetail, BreedList } from "@/types/healthNote/dogpedia";
import { decodeImageFilenameFromUrl } from "@/utils/decodeImageFilenameFromUrl";

const getBreedList = async (instance: AxiosInstance = axiosInstance): Promise<BreedList> => {
  const errorMessage = "견종 목록 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(`/api/v2/pets/breeds/selectable`);

    if(data.success) {
      return data.data.petBreedList;
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
};

const getBreedDetail = async (
  breedId: number,
  instance: AxiosInstance = axiosInstance
): Promise<BreedDetail> => {
  const errorMessage = "견종 목록 상세 조회에 실패했습니다.";
  try {
    const { data } = await instance.get(`/api/v2/pets/breeds/${breedId}`);

    const { imageUrl, ...rest } = data.data;
    const safeImageUrl = decodeImageFilenameFromUrl(imageUrl.url);
    if(data.success) {
      return {
        ...rest,
        imageUrl: safeImageUrl,
    };
    }
    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
};

export {
  getBreedList,
  getBreedDetail,
};
