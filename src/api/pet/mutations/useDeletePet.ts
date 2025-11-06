import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { deletePet } from "../pet";

export function useDeletePet(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePet,
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
        });
      } else {
        throw new Error(res.message as string);
      }
    },
    onError: (error) => {
      console.error(error);
    },
    ...mutationOptions,
  });
}
