import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createReviewDetail } from "@/api/review/review";
import { CreateReviewDetail, UseMutationCustomOptions } from "@/types";

export { useCreateReviewDetail };

function useCreateReviewDetail(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body }: { body: CreateReviewDetail }) => createReviewDetail(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST],
      })
    },

    ...mutationOptions,
  })
}