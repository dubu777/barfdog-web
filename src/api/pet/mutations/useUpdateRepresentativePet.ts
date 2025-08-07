import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRepresentativeDog } from "@/api/dog/dog";

export function useUpdateRepresentativePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dogId }: { dogId: number }) =>
      updateRepresentativeDog(dogId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
        }),
      ]);
    },
  });
}
