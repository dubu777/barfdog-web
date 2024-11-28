import {QueryClient, useInfiniteQuery} from "@tanstack/react-query";
import {queryKeys} from "@/constants/queryKeys";
import {getRewardList} from "@/api/reward";
import {RewardListData} from "@/types/reward";

export function useGetRewards() {
  return useInfiniteQuery<RewardListData, Error>({
    queryKey: [queryKeys.REWARDS, queryKeys.GET_REWARDS_LIST],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getRewardList({ pageParam: pageNumber, size: 5 });
      console.log("Fetched data:", data);
      return data as RewardListData;
    },
    getNextPageParam: (lastPage) => {
      const page = lastPage?.page || { number: 0, totalPages: 1 };
      const nextPage = page.number + 1;
      return nextPage < page.totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });
}
export async function prefetchGetRewards(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.REWARDS, queryKeys.GET_REWARDS_LIST],
        queryFn: async () => {
      const data = await getRewardList({ pageParam: 0, size: 5 });
      return {
        pages: [data], 
        pageParams: [0],
      };
    },
  });
}
