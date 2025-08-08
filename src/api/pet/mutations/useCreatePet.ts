import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createPet } from "../pet";

export function useCreatePet(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPet,
    onSuccess: async (response) => {
      if (response.success) {
        const petId = response.data?.petId;
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_DETAIL, petId],
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
