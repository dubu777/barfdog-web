import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { FullDogDetail, UseSuspenseQueryCustomOptions } from "@/types";
import { getFullDogList } from "../dog";

const getFullDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_FULL_DOG_LIST];

export function useGetFullDogList(queryOptions?: UseSuspenseQueryCustomOptions<FullDogDetail[]>) {
  return useSuspenseQuery({
    queryFn: () => getFullDogList(),
    queryKey: getFullDogListQueryKey,
    ...queryOptions,
  })
}

