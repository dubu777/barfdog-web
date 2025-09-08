import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewFormValues, UseMutationCustomOptions } from "@/types";
import { updateReview } from "@/api/mypage/review/review";
import { queryKeys } from "@/constants";

export function useUpdateReview(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, body }: { reviewId: number; body: ReviewFormValues }) => updateReview(reviewId, body),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.MYPAGE.BASE,
            queryKeys.MYPAGE.REVIEW.BASE,
            queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
            (data as { reviewId: number }).reviewId
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.MYPAGE.BASE,
            queryKeys.MYPAGE.REVIEW.BASE,
            queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
            'written',
          ],
        }),
      ]);
    },
    ...mutationOptions,
  })
}