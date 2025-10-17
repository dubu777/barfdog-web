import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { ApiResponse, ReferralRewardList, SendReferralCode } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getReferralRewardList = async ({
	pageParam = 0,
	instance = axiosInstance
}: { pageParam: number; instance?: AxiosInstance}) => {
	const { data }: { data: ApiResponse<ReferralRewardList> } = await instance.get(`/api/v2/user/rewards/referral`, {
		params: { page: pageParam, size: 20 },
	});
	const { referralRewardInfo, rewardList, pagination } = validateApiResponse(data, "적립금 목록 조회에 실패했습니다.");

	return {
		referralRewardInfo,
		rewardList,
		page: pagination,
	}
}

const createReferralCode = async (body: { referralCode: string }) => {
	const { data } = await axiosInstance.put('/api/v2/user/referrals/code', body);
	return validateApiResponse(data, "추천 코드를 입력하는데 실패했습니다.");
}

const sendReferralsCodeMessage = async (body: SendReferralCode) => {
	const { data } = await axiosInstance.post('/api/v2/user/referrals/sms', body);
	return validateApiResponse(data, "친구에게 문자로 추천 코드를 보내는데 실패했습니다.");
}

export {
	getReferralRewardList,
	createReferralCode,
	sendReferralsCodeMessage,
}