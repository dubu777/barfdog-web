import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getRewardList } from "@/api/mypage/reward/reward";

export function useGetInfiniteRewardList() {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.REWARD.BASE, 
      queryKeys.MYPAGE.REWARD.GET_REWARD_LIST
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getRewardList({ pageParam: pageNumber });
      return data;
    },
    getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.page?.page ?? 0;
			const totalPages = lastPage?.page?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
    initialPageParam: 0,
  });
}