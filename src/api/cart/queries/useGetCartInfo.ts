import { CartInfo, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCartInfo } from "@/api/cart/cart";

export function useGetCartInfo(queryOptions?: UseQueryCustomOptions<CartInfo>) {
	return useQuery<CartInfo>({
		queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
		queryFn: () => getCartInfo(),
		staleTime: 60 * 5 * 1000,
		...queryOptions,
	})
}
