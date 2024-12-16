import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogData, UseSuspenseQueryCustomOptions } from "@/types";
import { getDogs } from "../dog";


export { useGetDogs, prefetchGetDogs };

function useGetDogs(queryOptions?: UseSuspenseQueryCustomOptions<DogData[]>) {
  return useSuspenseQuery({
    queryFn: () => getDogs(),
    queryKey: [queryKeys.DOG, queryKeys.GET_DOGS],
    ...queryOptions,
  })
}
async function prefetchGetDogs(queryClient: QueryClient) {
  await queryClient.prefetchQuery<DogData[]>({
    queryKey: [queryKeys.GET_DOGS],
    queryFn: getDogs,
  });
}