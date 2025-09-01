import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { MyPageBannerData, MyPageInfoData } from "@/types";

const getMyPageInfo = async (instance: AxiosInstance = axiosInstance): Promise<MyPageInfoData> => {
	const { data }: { data: MyPageInfoData } = await instance.get('/api/mypage');
	return data;
}

const getMyPageBanner = async (instance: AxiosInstance = axiosInstance): Promise<MyPageBannerData> => {
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

export {
	getMyPageInfo,
	getMyPageBanner,
}