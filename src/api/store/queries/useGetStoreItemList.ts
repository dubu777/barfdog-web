import { ItemType, SortByType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getStoreItemList } from "@/api/store/store";

export function useGetStoreItemList(sortBy: SortByType, itemType: ItemType) {
  return useQuery({
    queryKey: [queryKeys.STORE.BASE, queryKeys.STORE.GET_STORE_ITEM_LIST],
    queryFn: () => getStoreItemList({ pageParam: 0, sortBy, itemType }),
  })
}