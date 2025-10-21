import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItemById, deleteCartItemByIds } from "@/api/cart/cart";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

const updateNewCartInfo = async (queryClient: QueryClient) => {
	await queryClient.invalidateQueries({
		queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
	});
}

export function useDeleteCartItemById(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ itemId }: { itemId: number }) => deleteCartItemById(itemId),
		onSuccess: async () => await updateNewCartInfo(queryClient),
		...mutationOptions,
	})
}

export function useDeleteCartItemByIds(mutationOptions?: UseMutationCustomOptions) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ deleteBasketIdList } : { deleteBasketIdList: number[] }) => deleteCartItemByIds(deleteBasketIdList),
		onSuccess: async () => await updateNewCartInfo(queryClient),
		...mutationOptions,
	})
}
