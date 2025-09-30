import { UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { disconnectSns } from "../account";

export function useDisconnectSns(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: disconnectSns,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					queryKeys.MYPAGE.BASE, 
					queryKeys.MYPAGE.ACCOUNT.BASE, 
					queryKeys.MYPAGE.ACCOUNT.GET_USER_INFO
				]
			});
		},
		...mutationOptions,
	})
}