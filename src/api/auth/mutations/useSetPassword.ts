import { SetPassword, UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { setPassword } from "@/api/auth/auth";

export { useSetPassword };

function useSetPassword(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: SetPassword) => setPassword(body),
		...mutationOptions,
	})
}