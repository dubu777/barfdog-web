import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { deleteReview } from "@/api/review/review";
import { UseMutationCustomOptions } from "@/types";
import { useBackNavigation } from "@/utils";
export { useDeleteReview };

function useDeleteReview(page: number, mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  const goBack = useBackNavigation();
  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST],
      })
      goBack();
    },
    ...mutationOptions,
  })
}