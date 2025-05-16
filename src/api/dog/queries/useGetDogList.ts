import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogData, UseSuspenseQueryCustomOptions } from "@/types";
import { getDogList } from "../dog";

export { useGetDogList };

const getDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST];

function useGetDogList(queryOptions?: UseSuspenseQueryCustomOptions<DogData[]>) {
  return useSuspenseQuery({
    queryFn: () => getDogList(),
    queryKey: getDogListQueryKey,
    ...queryOptions,
  })
}
