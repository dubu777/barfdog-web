import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { updateAddress } from "../address";
import { queryKeys } from "@/constants";


export function useUpdateAddress(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
      });
    },
    ...mutationOptions,
  })
}