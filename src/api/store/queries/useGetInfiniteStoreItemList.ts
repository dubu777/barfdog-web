import { useInfiniteQuery } from "@tanstack/react-query";
import { ItemType, SortByType, StoreItemList } from "@/types";
import { queryKeys } from "@/constants";
import { getInfiniteStoreItemList } from "@/api/store/store";

export function useGetInfiniteStoreItemList(sortBy: SortByType, itemType: ItemType) {
	return useInfiniteQuery<StoreItemList, Error>({
		queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST, sortBy, itemType],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getInfiniteStoreItemList({ pageParam: pageNumber, size: 6, sortBy, itemType });
			return data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage || !lastPage.page) return undefined;

			const nextPage = lastPage.page.number + 1;
			const totalPages = lastPage.page.totalPages;

			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
	});
}