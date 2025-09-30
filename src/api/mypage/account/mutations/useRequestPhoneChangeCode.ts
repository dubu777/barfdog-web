import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { requestPhoneChangeCode } from "../account";
import { RequestPhoneChangeCode } from "@/types/mypage/account";

export function useRequestPhoneChangeCode(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: RequestPhoneChangeCode) => requestPhoneChangeCode(body),
		...mutationOptions,
	})
}