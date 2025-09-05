import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { CreateReview, UseMutationCustomOptions } from "@/types";
import { createReview } from "@/api/mypage/review/review";

export function useCreateReview(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body }: { body: CreateReview }) => createReview(body), 
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