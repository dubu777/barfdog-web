import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createProbiomeResult } from "../probiome";
import { CreateProbiomeResponse } from "@/types/healthNote/probiome";
import { queryKeys } from "@/constants";

export function useCreateProbiomeResult(
  mutationOptions?: UseMutationCustomOptions<CreateProbiomeResponse>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProbiomeResult,
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries({
          queryKey: [
            queryKeys.PROBIOME.BASE,
            queryKeys.PROBIOME.GET_PROBIOME_LIST,
          ],
        });
      } else {
        throw new Error(res.message as string);
      }
    },
    ...mutationOptions,
  });
}
