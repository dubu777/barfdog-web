import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { RewardListData, RewardListDataWithTotals, RewardResponse } from "@/types";

const getRewardList = async ({
	pageParam = 0,
	size = 5,
	instance = axiosInstance
}: { pageParam: number; size: number; instance?: AxiosInstance }): Promise<RewardListData | RewardListDataWithTotals> => {
	const { data } = await instance.get<RewardResponse>(`/api/rewards`, {
		params: { page: pageParam, size },
	});

	const rewardList = data?.pagedModel?._embedded?.queryRewardsDtoList || [];
	const totalReward = data?.reward || 0;
	const totalCount = data?.pagedModel?.page?.totalElements || 0;
	const page = data?.pagedModel?.page || { number: 0, totalPages: 1 };

	if(pageParam === 0) {
		return {
			totalReward,
			rewardList,
			totalCount,
			page,
		}
	}
	return {
		rewardList,
		page,
	}
};

export {
	getRewardList,
}