import { UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { ItemType, SortByType, StoreItemList } from "@/types";
import { getStoreItemList } from "@/api/store/store";

export { useGetStoreItemList, prefetchGetStoreItemList };

function useGetStoreItemList(page: number, sortBy: SortByType, itemType: ItemType, queryOptions?: UseSuspenseQueryCustomOptions<StoreItemList>) {
  return useSuspenseQuery<StoreItemList>({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST, page, sortBy, itemType],
    queryFn: () => getStoreItemList(page, 6, sortBy, itemType),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetStoreItemList(queryClient: QueryClient, page: number, sortBy: SortByType, itemType: ItemType) {
  return queryClient.prefetchQuery<StoreItemList>({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST, page, sortBy, itemType],
    queryFn: () => getStoreItemList(page, 6, sortBy, itemType),
  })
}