import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getStoreItemList } from "@/api/store/store";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteStoreItemList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.STORE.BASE,
      queryKeys.STORE.GET_STORE_ITEM_LIST,
      'recent',
      'ALL'
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getStoreItemList({
        pageParam,
        sortBy: 'recent',
        itemType: 'ALL',
        instance
      }),
  }, ssrAxios);
}
