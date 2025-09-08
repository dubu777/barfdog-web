import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecommendCode } from "@/api/mypage/inviteFriends/inviteFriends";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

export function useCreateRecommendCode(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { recommendCode: string }) => createRecommendCode(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_INVITE_REWARD_LIST],
      });
    },
    ...mutationOptions,
  })
}