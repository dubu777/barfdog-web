import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogDetail, UseQueryCustomOptions } from "@/types";
import { getDogDetail } from "../dog";

export { useGetDogDetail, prefetchGetDogDetail };

function useGetDogDetail(dogId: number, queryOptions?: UseQueryCustomOptions<DogDetail>) {
  return useQuery({
    queryFn: async () => await getDogDetail(dogId),
    queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_DETAIL, dogId],
    ...queryOptions,
  })
}
async function prefetchGetDogDetail(queryClient: QueryClient, dogId: number) {
  await queryClient.prefetchQuery<DogDetail>({
    queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_DETAIL, dogId],
    queryFn: () => getDogDetail(dogId),
  });
}