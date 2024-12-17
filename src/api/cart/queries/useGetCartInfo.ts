import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCartInfo } from "@/api/cart/cart";
import {CartInfo, UseQueryCustomOptions} from "@/types";

export { useGetCartInfo, prefetchGetCartInfo };

function useGetCartInfo(queryOptions?: UseQueryCustomOptions<CartInfo>) {
    return useQuery<CartInfo>({
        queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
        queryFn: getCartInfo,
        ...queryOptions,
    })
}

async function prefetchGetCartInfo(queryClient: QueryClient) {
    await queryClient.prefetchQuery<CartInfo>({
        queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
        queryFn: getCartInfo,
    });
}
