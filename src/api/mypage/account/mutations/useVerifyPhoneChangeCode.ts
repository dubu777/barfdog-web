import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { verifyPhoneChangeCode } from "../account";
import { VerifyPhoneChangeCode } from "@/types/mypage/account";

export function useVerifyPhoneChangeCode(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: VerifyPhoneChangeCode) => verifyPhoneChangeCode(body),
		...mutationOptions,
	})
}