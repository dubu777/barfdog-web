import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItems } from "@/api/cart/cart";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

export function useDeleteCartItems(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItems,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
      }),
    ...mutationOptions,
  });
}
