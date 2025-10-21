import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getStoreItemList } from "../store";

export async function prefetchGetStoreItemList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST],
    queryFn: () => getStoreItemList({ pageParam: 0, sortBy: 'recent', itemType: 'RAW', instance: ssrAxios }),
  });
}
