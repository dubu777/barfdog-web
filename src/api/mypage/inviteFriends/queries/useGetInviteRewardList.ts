import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { InviteRewardList } from "@/types";
import { getInviteRewardList } from "@/api/mypage/inviteFriends/inviteFriends";

export function useGetInviteRewardList() {
  return useInfiniteQuery<InviteRewardList>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.REWARD.BASE, queryKeys.MYPAGE.REWARD.GET_INVITE_REWARD_LIST],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getInviteRewardList({ pageParam: pageNumber});
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.page) return undefined;

      const nextPage = lastPage.page.number + 1;
      const totalPages = lastPage.page.totalPages;

      return nextPage < totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  })
}
