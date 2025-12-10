import { UpdateCartInfo, UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartInfo } from "@/api/cart/cart";
import { queryKeys } from "@/constants";

export function useUpdateCartInfo(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartInfo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.CART.BASE, queryKeys.CART.GET_CART_INFO],
      });
    },
    ...mutationOptions,
  });
}
