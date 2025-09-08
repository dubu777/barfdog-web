import { UserInfoFormValues, UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "@/api/auth/auth";
import { queryKeys } from "@/constants";

export { useUpdateUserInfo };

function useUpdateUserInfo(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UserInfoFormValues) => updateUserInfo(body),
		onSuccess: async (data) => {
			console.log('mutation success', data);
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO],
			});
		},
		...mutationOptions,
	})
}