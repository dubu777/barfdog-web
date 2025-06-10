import { ChangePassword, UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/auth/auth";

export { useChangePassword };

function useChangePassword(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: ChangePassword) => changePassword(body),
		...mutationOptions,
	})
}