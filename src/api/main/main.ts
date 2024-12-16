import axiosInstance from "@/api/axiosInstance";
import { RecipeDto } from "@/types";
import { MainInfoData } from "@/types/main";

export { getMainInfo, getMainDeadlineBanner };

const getMainInfo = async (): Promise<MainInfoData> => {
  const { data } = await axiosInstance.get('/api/home');
  return {
    ...data,
    recipeDtoList: data.recipeDtoList.sort((a: RecipeDto, b: RecipeDto) => a.id - b.id)
  };
}

const getMainDeadlineBanner = async (): Promise<string> => {
  const { data } = await axiosInstance.get('/api/banners/deadline');
  return data.orderDeadline;
}