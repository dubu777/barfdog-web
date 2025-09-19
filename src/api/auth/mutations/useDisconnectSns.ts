import { UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disconnectSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";
import axios from "axios";

export { useDisconnectSns };

function useDisconnectSns(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: disconnectSns,
		onSuccess: async (data) => {
			if(data.status === 200) {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_CONNECTED_SNS]
				});
			}
		},
		onError: (error) => {
			const errorMessage = '통신장애로 인해 SNS연동에 실패하였습니다.'
			alert(errorMessage);
			if(axios.isAxiosError(error)) {
				throw new Error(errorMessage, error);
			}
		},
		...mutationOptions,
	})
}