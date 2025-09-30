import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { withdrawalAccount } from "../account";

export function useWithdrawalAccount(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: () => withdrawalAccount(),
		...mutationOptions,
	})
}