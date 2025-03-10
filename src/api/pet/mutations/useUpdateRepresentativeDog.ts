import {queryKeys} from "@/constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateRepresentativeDog} from "@/api/pet/pet";

export { useUpdateRepresentativeDog };

const getDogListQueryKey = [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST];
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