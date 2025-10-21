import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReferralRewardList } from "@/api/mypage/inviteFriends/inviteFriends";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetReferralRewardList() {
  return useInfiniteQuery(createInfiniteQueryConfig({
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.REWARD.BASE, 
      queryKeys.MYPAGE.REWARD.GET_REFERRAL_REWARD_LIST
    ],
    queryFn: async ({ pageParam }) => {
      return await getReferralRewardList({ pageParam });
    },
  }));
}
