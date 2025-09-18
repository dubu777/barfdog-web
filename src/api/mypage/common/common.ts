import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { MyPageBannerData, MyPageInfoDataTemp, MyPageInfoData, ApiResponse, MyPageBannerDataTemp } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getMyPageInfo = async (instance: AxiosInstance = axiosInstance): Promise<MyPageInfoData> => {
	const { data }: { data: ApiResponse<MyPageInfoData> } = await instance.get('/api/v2/myPage');
	
	return validateApiResponse(data, "마이페이지 정보 조회에 실패했습니다.");
}

const getMyPageBanner = async (instance: AxiosInstance = axiosInstance): Promise<MyPageBannerData> => {
	const { data }: { data: ApiResponse<MyPageBannerData> } = await instance.get('/api/v2/myPage/banner');
	
	return validateApiResponse(data, "마이페이지 배너 조회에 실패했습니다.");
}

export {
	getMyPageInfo,
	getMyPageBanner,
}