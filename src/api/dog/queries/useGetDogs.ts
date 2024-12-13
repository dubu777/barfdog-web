import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogData, UseSuspenseQueryCustomOptions } from "@/types";
import { getDogs } from "../dog";


export function useGetDogs(queryOptions?: UseSuspenseQueryCustomOptions<DogData[]>) {
  return useSuspenseQuery({
    queryFn: () => getDogs(),
    queryKey: [queryKeys.DOG, queryKeys.GET_DOGS],
    ...queryOptions,
  })
}
