import { QueryClient } from "@tanstack/react-query";
import { CartInfo } from "@/types";
import { getCartInfo } from "@/api/cart/cart";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";

export async function prefetchGetCartInfo(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return await queryClient.prefetchQuery<CartInfo>({
		queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
		queryFn: () => getCartInfo(ssrAxios),
	})
}