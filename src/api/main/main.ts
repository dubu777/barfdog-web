import axiosInstance from "@/api/axiosInstance";
import { RecipeDto } from "@/types";
import { MainInfoData } from "@/types/main";

export { getMainInfo, getMainDeadlineBanner };

const getMainInfo = async (): Promise<MainInfoData> => {
  const { data } = await axiosInstance.get('/api/home');
  return {
    mainBannerList: data.mainBannerDtoList,
    popupBannerList: data.popupBannerDtoList,
    bestReviewList: data.queryBestReviewsDtoList,
    topBanner: data.topBannerDto,
    recipeList: data.recipeDtoList.sort((a: RecipeDto, b: RecipeDto) => a.id - b.id)
  };
}

// const getMainBanner = async (): Promise<MainInfoData> => {
//   const { data } = await axiosInstance.get('/api/banners/main');
//   return data?._embedded?.mainBannerListResponseDtoList || [];
// }

const getMainDeadlineBanner = async (): Promise<string> => {
  const { data } = await axiosInstance.get('/api/banners/deadline');
  return data.orderDeadline;
}