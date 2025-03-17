import { UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConnectSns } from "@/types";
import { connectSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";
import { useBackNavigation } from "@/utils";

export { useConnectSns };

function useConnectSns(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	const goBack = useBackNavigation();
	return useMutation({
		mutationFn: (body: ConnectSns) => connectSns(body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_CONNECTED_SNS],
			})
			setTimeout(() => {
				goBack();
			}, 300)
		},
		...mutationOptions,
	})
}