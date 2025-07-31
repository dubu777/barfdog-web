import { queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDogInfo } from "@/api/dog/dog";
import { DogDetailData, UseMutationCustomOptions } from "@/types";

export { useUpdateDogInfo };

const getDogDetailQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_DETAIL];
const getDogListQueryKey = [
  queryKeys.DOG.BASE,
  queryKeys.DOG.GET_FULL_DOG_LIST,
];

function useUpdateDogInfo(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ body }: { body: DogDetailData }) => {
      const dogId = body.id;
      return await updateDogInfo(dogId, body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getDogDetailQueryKey });
      await queryClient.invalidateQueries({ queryKey: getDogListQueryKey });
    },
    onError: (error) => {
      console.log(error);
    },
    ...mutationOptions,
  });
}
