import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { ApiResponse, ReferralRewardList, SendReferralCode } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getReferralRewardList = async ({
	pageParam = 0,
	instance = axiosInstance
}: { pageParam: number; instance?: AxiosInstance}) => {
	const { data }: { data: ApiResponse<ReferralRewardList> } = await instance.get(`/api/v2/rewards/my-page/referral`, {
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
	const { data } = await axiosInstance.put('/api/v2/rewards/my-page/referral-code', body);
	return validateApiResponse(data, "추천 코드를 입력하는데 실패했습니다.");
}

const sendReferralsCodeMessage = async (body: SendReferralCode) => {
	const { data } = await axiosInstance.post('/v2/referrals/my-page/referrals/sms', body);
	return validateApiResponse(data, "친구에게 문자로 추천 코드를 보내는데 실패했습니다.");
	// try {
	// 	console.log('data',data);
	// 	let message;
	// 	const smsStatus = data.responseCode;
	// 	switch (smsStatus) {
	// 		case 200:
	// 			if(data.msg === null) {
	// 				message = '친구에게 문자로 추천 코드를 보냈어요';
	// 			} else {
	// 				message = data.msg;
	// 			}
	// 			break;
	// 		case 100:
	// 			message = '전송자의 번호가 유효하지 않습니다.';
	// 			break;
	// 		case 101:
	// 			message = '전송 시 유효성 검사 실패';
	// 			break;
	// 		case 102:
	// 			message = '수신자의 번호가 유효하지 않습니다.';
	// 			break;
	// 		case 104:
	// 			message = '받는 사람이 없습니다.';
	// 			break;
	// 		case 106:
	// 			message = '메시지 유효성검사에 실패하였습니다.';
	// 			break;
	// 		case 201:
	// 			message = '분당 300회 이상 API 호출을 할 수 없습니다.';
	// 			break;
	// 		case 205:
	// 			message = '문자전송 잔액부족. 관리자에게 문의하세요.';
	// 			break;
	// 		default:
	// 			message = '메시지를 전송할 수 없습니다. 관리자에게 문의하세요.';
	// 			break;
	// 	}
	// 	return message;
	// } catch (err) {
	// 	console.log(err);
	// 	return err;
	// }
}

export {
	getReferralRewardList,
	createReferralCode,
	sendReferralsCodeMessage,
}