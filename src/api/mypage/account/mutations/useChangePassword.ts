import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../account";
import { ChangePassword } from "@/types/mypage/account";

export function useChangePassword(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: ChangePassword) => changePassword(body),
		...mutationOptions,
	})
}