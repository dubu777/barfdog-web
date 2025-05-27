import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRepresentativeDog } from "@/api/dog/dog";

export { useUpdateRepresentativeDog };

const getDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST];

function useUpdateRepresentativeDog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dogId }: { dogId: number }) => updateRepresentativeDog(dogId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getDogListQueryKey }),
      ])
    }
  })
}