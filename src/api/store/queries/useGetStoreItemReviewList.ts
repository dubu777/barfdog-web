import { StoreItemDetailReviewList, UseQueryCustomOptions } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getStoreItemReviewList } from "@/api/store/store";

export { useGetStoreItemReviewList, prefetchGetStoreItemReviewList };

function useGetStoreItemReviewList(itemId: number, page: number, queryOptions?: UseQueryCustomOptions<StoreItemDetailReviewList>) {
  return useQuery<StoreItemDetailReviewList>({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_REVIEW_LIST, itemId, page],
    queryFn: () => getStoreItemReviewList(itemId, page),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetStoreItemReviewList(queryClient: QueryClient, itemId: number, page: number) {
  return queryClient.prefetchQuery<StoreItemDetailReviewList>({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_REVIEW_LIST, itemId, page],
    queryFn: () => getStoreItemReviewList(itemId, page),
  })
}