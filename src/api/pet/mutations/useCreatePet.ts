import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createPet } from "../pet";

export function useCreatePet(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPet,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
      });
    },
    onError: (error) => {
      console.error(error);
    },
    ...mutationOptions,
  });
}
