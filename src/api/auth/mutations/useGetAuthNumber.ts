import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { getAuthNumber } from "@/api/auth/auth";

export { useGetAuthNumber };

function useGetAuthNumber(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: { phoneNumber: string }) => getAuthNumber(body),
		...mutationOptions,
	})
}