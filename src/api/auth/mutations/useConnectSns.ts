import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ConnectSns } from "@/types";
import { connectSns } from "@/api/auth/auth";

export { useConnectSns };

function useConnectSns(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: ConnectSns) => connectSns(body),
		...mutationOptions,
	})
}