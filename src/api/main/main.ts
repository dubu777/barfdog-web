import axiosInstance from "@/api/axiosInstance";
import { ApiResponse } from "@/types";
import { MainBannerInfo } from "@/types/main";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { AxiosInstance } from "axios";

const getMainBannerInfo = async (instance: AxiosInstance = axiosInstance): Promise<MainBannerInfo> => {
  const { data }: { data: ApiResponse<MainBannerInfo> } = await instance.get(`/api/v2/public/banners/main`);
  return validateApiResponse(data, "메인 배너 정보 조회에 실패했습니다.");
}
  
export { 
  getMainBannerInfo,
};