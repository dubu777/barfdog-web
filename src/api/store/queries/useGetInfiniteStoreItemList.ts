import { useInfiniteQuery } from "@tanstack/react-query";
import { ItemType, SortByType } from "@/types";
import { queryKeys } from "@/constants";
import { getStoreItemList } from "@/api/store/store";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteStoreItemList(sortBy: SortByType, itemType: ItemType) {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.STORE.BASE, 
			queryKeys.STORE.GET_STORE_ITEM_LIST, 
			sortBy, 
			itemType
		],
    queryFn: async ({ pageParam }) => {
      return await getStoreItemList({ 
				pageParam,
				sortBy,
				itemType
			});
    },
  }));
}