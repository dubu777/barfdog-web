import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCartData } from "@/api/cart";

export function useGetCart() {
    return useQuery({
        queryKey: [queryKeys.CART, queryKeys.GET_CART_DATA],
        queryFn: getCartData,
    })
}

export async function prefetchGetCartData(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: [queryKeys.CART, queryKeys.GET_CART_DATA],
        queryFn: getCartData,
    });
}
