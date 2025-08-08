import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { updatePet } from "../pet";

export function useUpdatePet(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePet,
    onSuccess: async (response, variables, context) => {
      if (response.success) {
        const petId = response.data?.petId;
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_DETAIL, petId],
        });
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
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
