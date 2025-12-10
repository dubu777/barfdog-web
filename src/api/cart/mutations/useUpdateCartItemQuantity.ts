import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { updateCartItemQuantity } from "@/api/cart/cart";

export function useUpdateCartItemQuantity(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: updateCartItemQuantity,
    ...mutationOptions,
  });
}
