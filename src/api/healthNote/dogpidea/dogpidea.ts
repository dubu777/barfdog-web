import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import { Breed, BreedDetail, BreedList } from "@/types/healthNote/dogpedia";
import { decodeImageFilenameFromUrl } from "@/utils/decodeImageFilenameFromUrl";
import { ApiResponse } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getBreedList = async (instance: AxiosInstance = axiosInstance): Promise<Breed[]> => {
  const { data }: { data: ApiResponse<BreedList> } = await instance.get(`/api/v2/pets/breeds/selectable`);

  const responseData = validateApiResponse(data, "견종 목록 조회에 실패했습니다.");
  return responseData.petBreedList;
};

const getBreedDetail = async (
  breedId: number,
  instance: AxiosInstance = axiosInstance
): Promise<BreedDetail> => {
  const { data }: { data: ApiResponse<BreedDetail> } = await instance.get(`/api/v2/pets/breeds/${breedId}`);

  const responseData = validateApiResponse(data, "견종 목록 상세 조회에 실패했습니다.");
  const { imageUrl, ...rest } = responseData;
  
  const safeImageUrl = decodeImageFilenameFromUrl(imageUrl.url);
  return {
    ...rest,
    imageUrl: {
      url: safeImageUrl,
    },
  };
};

export {
  getBreedList,
  getBreedDetail,
};
