import { useInfiniteQuery } from "@tanstack/react-query";
import { ItemType, SortByType, StoreItemList } from "@/types";
import { queryKeys } from "@/constants";
import { getInfiniteStoreItemList } from "@/api/store/store";

export function useGetInfiniteStoreItemList(sortBy: SortByType, itemType: ItemType) {
	return useInfiniteQuery({
		queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST, sortBy, itemType],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getInfiniteStoreItemList({
				pageParam: pageNumber,
				sortBy,
				itemType
			});
			return data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.pagination?.page ?? 0;
			const totalPages = lastPage?.pagination?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
    initialPageParam: 0,
	});
}