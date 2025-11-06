import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createProbiomePickup } from "../probiome";
import { queryKeys } from "@/constants";

export function useCreateProbiomePickup(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProbiomePickup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.PROBIOME.BASE,
          queryKeys.PROBIOME.GET_PROBIOME_LIST,
        ],
      });
    },
    ...mutationOptions,
  });
}
