import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { ApiResponse, RewardList } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getRewardList = async ({
	pageParam = 0,
	size = 20,
	instance = axiosInstance
}: { pageParam: number; size?: number; instance?: AxiosInstance }) => {
	const { data }: { data: ApiResponse<RewardList> } = await instance.get(`/api/v2/user/rewards`, {
		params: { page: pageParam, size },
	});

	const responseData = validateApiResponse(data, "적립금 목록 조회에 실패했습니다.");
	const rewardList = responseData.rewardList ?? [];

	return {
		rewardList,
		totalRewardAmount: responseData.totalRewardAmount,
		page: responseData.pagination,
	}
};

export {
	getRewardList,
}