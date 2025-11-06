import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { createSubscription } from "../subscription";

export function useCreateSubscription(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubscription,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
      });
    },
    ...mutationOptions,
  });
}
