import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { InviteRewardList } from "@/types";
import { getInviteRewardList } from "@/api/mypage/mypage";

export function useGetInviteRewardList() {
  return useInfiniteQuery<InviteRewardList>({
    queryKey: [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_INVITE_REWARD_LIST],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getInviteRewardList({ pageParam: pageNumber, size: 5 });
      return data;
    },
    getNextPageParam: (lastPage) => {
      //  lastPage가 undefined인 경우를 막기 위해 조건을 추가
      if (!lastPage || !lastPage.page) return undefined;

      const nextPage = lastPage.page.number + 1;
      const totalPages = lastPage.page.totalPages;

      // 다음 페이지가 있다면 반환, 없으면 undefined
      return nextPage < totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  })
}
