import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { findUserEmail, sendTemporaryPassword } from "@/api/auth/auth";

export { useFindUserEmail, useSendTemporaryPassword };

function useFindUserEmail(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({name, phoneNumber}: { name: string, phoneNumber: string }) => findUserEmail(name, phoneNumber),
		...mutationOptions,
	})
}

function useSendTemporaryPassword(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: { email: string, name: string, phoneNumber: string }) => sendTemporaryPassword(body),
		...mutationOptions,
	})
}