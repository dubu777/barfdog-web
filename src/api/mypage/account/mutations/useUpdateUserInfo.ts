import { UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { UpdateUserInfo } from "@/types/mypage/account";
import { updateUserInfo } from "../account";

export function useUpdateUserInfo(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateUserInfo) => updateUserInfo(body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					queryKeys.MYPAGE.BASE, 
					queryKeys.MYPAGE.ACCOUNT.BASE, 
					queryKeys.MYPAGE.ACCOUNT.GET_USER_INFO
				],
			});
		},
		...mutationOptions,
	})
}