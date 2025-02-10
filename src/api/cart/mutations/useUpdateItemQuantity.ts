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

function useIncreaseItemQuantity(itemId: number, mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => increaseCartItem(itemId),
		onSuccess: async () => await updateNewCartInfo(queryClient),
		...mutationOptions,
	})
}

function useDecreaseItemQuantity(itemId: number, mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => decreaseCartItem(itemId),
		onSuccess: async () => await updateNewCartInfo(queryClient),
		...mutationOptions,
	})
}