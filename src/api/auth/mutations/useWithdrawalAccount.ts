import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { withdrawalAccount } from "@/api/auth/auth";

export function useWithdrawalAccount(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: { password: string }) => withdrawalAccount(body),
		...mutationOptions,
	})
}