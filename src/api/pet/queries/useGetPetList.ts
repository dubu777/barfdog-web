import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogData, UseSuspenseQueryCustomOptions } from "@/types";
import { getDogList } from "../pet";

export { useGetPetList, prefetchGetPetList };

const getPetListQueryKey = [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST];

function useGetPetList(queryOptions?: UseSuspenseQueryCustomOptions<DogData[]>) {
  return useSuspenseQuery({
    queryFn: () => getDogList(),
    queryKey: getPetListQueryKey,
    ...queryOptions,
  })
}
async function prefetchGetPetList(queryClient: QueryClient) {
  await queryClient.prefetchQuery<DogData[]>({
    queryKey: getPetListQueryKey,
    queryFn: getDogList,
  });
}