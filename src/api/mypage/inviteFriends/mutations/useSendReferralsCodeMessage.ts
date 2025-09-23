import { SendReferralCode	, UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { sendReferralsCodeMessage } from "@/api/mypage/inviteFriends/inviteFriends";

export function useSendReferralsCodeMessage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: SendReferralCode) => sendReferralsCodeMessage(body),
		...mutationOptions,
	})
}