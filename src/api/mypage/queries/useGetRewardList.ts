import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getRewardList } from "../mypage";
import { RewardListData, RewardListDataWithTotals } from "@/types/reward";

export { useGetRewardList, prefetchGetRewardList };

const getRewardListQueryKey = [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_REWARD_LIST];

function useGetRewardList() {
  return useInfiniteQuery<RewardListData | RewardListDataWithTotals, Error>({
    queryKey: getRewardListQueryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getRewardList({ pageParam: pageNumber, size: 5 });
      // return data as RewardListData;
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
  });
}


async function prefetchGetRewardList(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: getRewardListQueryKey,
    queryFn: async () => {
      const data = await getRewardList({ pageParam: 0, size: 5 });
      return {
        pages: [data],
        pageParams: [0],
      };
    },
  });
}