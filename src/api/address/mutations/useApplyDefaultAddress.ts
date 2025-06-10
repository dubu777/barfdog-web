import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { applyDefaultAddress } from "../address";
import { queryKeys } from "@/constants";


export function useApplyDefaultAddress(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyDefaultAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
      });
    },
    ...mutationOptions,
  })
}