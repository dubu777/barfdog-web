import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { MyPageBannerData, MyPageInfoDataTemp, MyPageInfoData, ApiResponse, MyPageBannerDataTemp } from "@/types";

const getMyPageInfoTemp = async (instance: AxiosInstance = axiosInstance): Promise<MyPageInfoDataTemp> => {
	const { data }: { data: MyPageInfoDataTemp } = await instance.get('/api/mypage');
	return data;
}

const getMyPageBannerTemp = async (instance: AxiosInstance = axiosInstance): Promise<MyPageBannerDataTemp> => {
	const { data } = await instance.get('/api/banners/myPage');
	const { id, name, status, filenamePc, filenameMobile, pcLinkUrl, mobileLinkUrl, _links } = data;

	return {
		id,
		name,
		status,
		filenamePc,
		filenameMobile,
		pcLinkUrl,
		mobileLinkUrl,
		imageUrl: {
			pc: _links?.thumbnail_pc?.href,
			mobile: _links?.thumbnail_mobile?.href,
		},
	};
}

// v2
const getMyPageInfo = async (instance: AxiosInstance = axiosInstance): Promise<MyPageInfoData> => {
	const { data }: { data: ApiResponse<MyPageInfoData> } = await instance.get('/api/v2/myPage');
	
	if (!data.success) {
		const errorMessage = data.message || data.detailMessage || 'API 요청이 실패했습니다.';
		const errorCode = data.errorCode || 'UNKNOWN_ERROR';
		throw new Error(`${errorCode}: ${errorMessage}`);
	}
	
	if (!data.data) {
		throw new Error('API 응답 데이터가 없습니다.');
	}
	
	return data.data;
}

const getMyPageBanner = async (instance: AxiosInstance = axiosInstance): Promise<MyPageBannerData> => {
	const { data }: { data: ApiResponse<MyPageBannerData> } = await instance.get('/api/v2/myPage/banner');
	
	if (!data.success) {
		const errorMessage = data.message || data.detailMessage || 'API 요청이 실패했습니다.';
		const errorCode = data.errorCode || 'UNKNOWN_ERROR';
		throw new Error(`${errorCode}: ${errorMessage}`);
	}
	
	if (!data.data) {
		throw new Error('API 응답 데이터가 없습니다.');
	}
	
	return data.data;
}

export {
	getMyPageInfoTemp,
	getMyPageBannerTemp,
	getMyPageInfo,
	getMyPageBanner,
}