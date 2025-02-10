import { StoreItemDetail, UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getStoreItemDetail } from "@/api/store/store";

export { useGetStoreItemDetail, prefetchGetStoreItemDetail };

function useGetStoreItemDetail(itemId: number, queryOptions?: UseSuspenseQueryCustomOptions<StoreItemDetail>) {
  return useSuspenseQuery<StoreItemDetail>({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_DETAIL, itemId],
    queryFn: () => getStoreItemDetail(itemId),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetStoreItemDetail(queryClient: QueryClient, itemId: number) {
  return queryClient.prefetchQuery<StoreItemDetail>({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_DETAIL, itemId],
    queryFn: () => getStoreItemDetail(itemId),
  })
}