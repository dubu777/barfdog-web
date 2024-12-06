import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogData, UseQueryCustomOptions } from "@/types";
import { getDogs } from "../dog";


export function useGetDogs(queryOptions?: UseQueryCustomOptions<DogData[]>) {
  return useQuery({
    queryFn: () => getDogs(),
    queryKey: [queryKeys.DOG, queryKeys.GET_DOGS],
    ...queryOptions,
  })
}
