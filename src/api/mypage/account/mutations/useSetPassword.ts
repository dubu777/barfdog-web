import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SetPassword } from "@/types/mypage/account";
import { setPassword } from "../account";
import { queryKeys } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";	

export function useSetPassword(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: SetPassword) => setPassword(body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					queryKeys.MYPAGE.BASE, 
					queryKeys.MYPAGE.ACCOUNT.BASE, 
					queryKeys.MYPAGE.ACCOUNT.VERIFY_PASSWORD
				],
			});
		},	
		...mutationOptions,
	})
}