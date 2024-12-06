import {QueryClient, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/constants/queryKeys";
import {getRewardList} from "../mypage";
import {RewardListData} from "@/types/reward";

export { useGetRewards, prefetchGetRewards };

const getRewardsQueryKey = [queryKeys.REWARDS, queryKeys.GET_REWARDS_LIST];

function useGetRewards() {
  const queryClient = useQueryClient();

  return useInfiniteQuery<RewardListData, Error>({
    queryKey: getRewardsQueryKey,
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
    initialData: () => queryClient.getQueryData(getRewardsQueryKey),
  });
}

async function prefetchGetRewards(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: getRewardsQueryKey,
        queryFn: async () => {
      const data = await getRewardList({ pageParam: 0, size: 5 });
      return {
        pages: [data], 
        pageParams: [0],
      };
    },
  });
}