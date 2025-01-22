import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { updateReviewDetail } from "@/api/review/review";
import { UpdateReviewDetail, UseMutationCustomOptions } from "@/types";

export { useUpdateReviewDetail };

function useUpdateReviewDetail(reviewId: number, page = 0, mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateReviewDetail) => updateReviewDetail(reviewId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL, reviewId],
      })
    },
    ...mutationOptions,
  })
}