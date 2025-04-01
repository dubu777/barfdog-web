import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createAddress } from "../address";
import { queryKeys } from "@/constants";


export function useCreateAddress(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
      });
    },
    ...mutationOptions,
  })
}