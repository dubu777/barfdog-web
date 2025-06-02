import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogListData, UseSuspenseQueryCustomOptions } from "@/types";
import { getDogList } from "../dog";

const getDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST];

export function useGetDogList(
  queryOptions?: UseSuspenseQueryCustomOptions<DogListData[]>
) {
  return useSuspenseQuery({
    queryFn: () => getDogList(),
    queryKey: getDogListQueryKey,
    ...queryOptions,
  });
}
