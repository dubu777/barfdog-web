import { SendMessage, UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { sendRecommendCodeMessage } from "@/api/mypage/mypage";

export { useSendRecommendCodeMessage };

function useSendRecommendCodeMessage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: SendMessage) => sendRecommendCodeMessage(body),
		...mutationOptions,
	})
}