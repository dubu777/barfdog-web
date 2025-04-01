import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createReviewDetail } from "@/api/review/review";
import { CreateReviewDetail, UseMutationCustomOptions } from "@/types";

export { useCreateReviewDetail };

function useCreateReviewDetail(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ body }: { body: CreateReviewDetail }) => createReviewDetail(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST, 0],
      })
      await router.push(`/mypage/review?tab=written&page=1`);
    },
    ...mutationOptions,
  })
}