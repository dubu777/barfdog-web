import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyRecommendCode } from "@/api/mypage/mypage";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

export { useApplyRecommendCode };

function useApplyRecommendCode(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { recommendCode: string }) => applyRecommendCode(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_INVITE_REWARD_LIST, 0],
      });
    },
    ...mutationOptions,
  })
}