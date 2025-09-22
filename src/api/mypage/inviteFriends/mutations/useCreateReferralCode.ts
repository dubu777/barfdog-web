import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReferralCode } from "@/api/mypage/inviteFriends/inviteFriends";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

export function useCreateReferralCode(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { referralCode: string }) => createReferralCode(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.REWARD.BASE, queryKeys.MYPAGE.REWARD.GET_REFERRAL_REWARD_LIST],
      });
    },
    ...mutationOptions,
  })
}