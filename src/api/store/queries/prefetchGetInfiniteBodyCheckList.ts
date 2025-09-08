import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { ItemType, SortByType } from "@/types";
import { getInfiniteStoreItemList } from "@/api/store/store";

export async function prefetchGetInfiniteStoreItemList(
  sortBy: SortByType,
  itemType: ItemType,
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      queryKeys.STORE.BASE,
      queryKeys.STORE.GET_STORE_ITEM_LIST,
      sortBy,
      itemType
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getInfiniteStoreItemList({
        pageParam,
        size: 20,
        sortBy,
        itemType,
        instance: ssrAxios
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
