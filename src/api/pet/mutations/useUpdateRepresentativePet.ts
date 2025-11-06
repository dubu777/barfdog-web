import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRepresentativePet } from "../pet";

export function useUpdateRepresentativePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRepresentativePet,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
        }),
      ]);
    },
  });
}
