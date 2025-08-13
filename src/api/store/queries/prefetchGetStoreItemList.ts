import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { ItemType, SortByType, StoreItemList } from "@/types";
import { queryKeys } from "@/constants";
import { getStoreItemList } from "@/api/store/store";

export async function prefetchGetStoreItemList(
	queryClient: QueryClient,
	page: number,
	sortBy: SortByType,
	itemType: ItemType,
	size: number = 6
) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<StoreItemList>({
		queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST, page, sortBy, itemType],
		queryFn: () => getStoreItemList(page, size, sortBy, itemType, ssrAxios),
	});
}