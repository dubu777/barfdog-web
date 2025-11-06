import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { updatePet } from "../pet";

export function useUpdatePet(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePet,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
        });
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_DETAIL],
        });
      } else {
        throw new Error(response.message as string);
      }
    },
    onError: (error) => {
      console.error(error);
    },
    ...mutationOptions,
  });
}
