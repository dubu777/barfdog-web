import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRepresentativeDog } from "@/api/dog/dog";

export { useUpdateRepresentativeDog };

const getDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST];
const getMyPageInfoQueryKey = [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_INFO];

function useUpdateRepresentativeDog(dogId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateRepresentativeDog(dogId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getDogListQueryKey }),
        queryClient.invalidateQueries({ queryKey: getMyPageInfoQueryKey })
      ])
    }
  })
}