import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { deleteAddress } from "../address";
import { queryKeys } from "@/constants";


export function useDeleteAddress(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
      });
    },
    ...mutationOptions,
  })
  
}