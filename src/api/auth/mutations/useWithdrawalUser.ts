import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { withdrawalUser } from "@/api/auth/auth";

export { useWithdrawalUser };

function useWithdrawalUser(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: { password: string }) => withdrawalUser(body),
		onSuccess: (data) => {

		},
		onError: (error) => {
			console.log('error', error)
		},
		...mutationOptions,
	})
}