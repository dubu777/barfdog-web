import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getRewardList } from "@/api/mypage/reward/reward";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteRewardList() {
  return useInfiniteQuery(createInfiniteQueryConfig({
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.REWARD.BASE, 
      queryKeys.MYPAGE.REWARD.GET_REWARD_LIST
    ],
    queryFn: async ({ pageParam }) => {
      return await getRewardList({ pageParam });
    },
  }));
}