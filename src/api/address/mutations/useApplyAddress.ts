import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { applyAddress } from "../address";
import { queryKeys } from "@/constants";


export function useApplyAddress(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
      });
    },
    ...mutationOptions,
  })
}