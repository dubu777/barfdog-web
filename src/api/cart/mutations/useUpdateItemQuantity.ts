import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { decreaseCartItem, increaseCartItem } from "@/api/cart/cart";
import { UseMutationCustomOptions } from "@/types";
import { queryKeys } from "@/constants";

export { useIncreaseItemQuantity, useDecreaseItemQuantity };

const getCartInfoQueryKey = [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO];

const updateNewCartInfo = async (queryClient: QueryClient) => {
	await queryClient.invalidateQueries({
		queryKey: getCartInfoQueryKey,
	});
}

function useIncreaseItemQuantity(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ basketId }: { basketId: number }) => increaseCartItem(basketId),
		onSuccess: async () => await updateNewCartInfo(queryClient),
		...mutationOptions,
	})
}

function useDecreaseItemQuantity(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ basketId }: { basketId: number }) => decreaseCartItem(basketId),
		onSuccess: async () => await updateNewCartInfo(queryClient),
		...mutationOptions,
	})
}