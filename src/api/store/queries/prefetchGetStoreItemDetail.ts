import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { getStoreItemDetail } from "@/api/store/store";
import { StoreItemDetail } from "@/types";

export async function prefetchGetStoreItemDetail(
	queryClient: QueryClient,
	itemId: number,
) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<StoreItemDetail>({
		queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_DETAIL, itemId],
		queryFn: () => getStoreItemDetail(itemId, ssrAxios),
	});
}