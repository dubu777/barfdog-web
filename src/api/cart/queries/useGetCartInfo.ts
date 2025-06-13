import { CartInfo, UseQueryCustomOptions } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCartInfo } from "@/api/cart/cart";

export { useGetCartInfo, prefetchGetCartInfo };

const getCartInfoQueryKey = [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO];

function useGetCartInfo(queryOptions?: UseQueryCustomOptions<CartInfo>) {
	return useQuery<CartInfo>({
		queryKey: getCartInfoQueryKey,
		queryFn: () => getCartInfo(),
		staleTime: 60 * 5 * 1000,
		...queryOptions,
	})
}

async function prefetchGetCartInfo(queryClient: QueryClient) {
	await queryClient.prefetchQuery<CartInfo>({
		queryKey: getCartInfoQueryKey,
		queryFn: () => getCartInfo(),
	})
}