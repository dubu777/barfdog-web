import axiosInstance from "../../axiosInstance";
import { AxiosInstance } from "axios";
import { BreedDetail, BreedList } from "@/types/healthNote/dogpedia";
import { decodeImageFilenameFromUrl } from "@/utils/decodeImageFilenameFromUrl";

const getBreedList = async (instance: AxiosInstance = axiosInstance): Promise<BreedList> => {
  const { data } = await instance.get(`/api/v2/pets/breeds/selectable`);

  return data.data.petBreedList;
};

const getBreedDetail = async (
  breedId: number,
  instance: AxiosInstance = axiosInstance
): Promise<BreedDetail> => {
  const { data } = await instance.get(`/api/v2/pets/breeds/${breedId}`);

  const { imageUrl, ...rest } = data.data;
  const safeImageUrl = decodeImageFilenameFromUrl(imageUrl.url);

  return {
    ...rest,
    imageUrl: safeImageUrl,
  };
};

export {
  getBreedList,
  getBreedDetail,
};
