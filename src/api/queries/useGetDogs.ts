import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getDogs } from "@/api/dogs";
import { DogData } from "@/types/dogs";

export function useGetDogs() {
  return useSuspenseQuery<DogData[]>({
    queryKey: [queryKeys.GET_DOGS],
    queryFn: getDogs,
    initialData: [] as DogData[],
  });
}

export async function prefetchGetDogs(queryClient: QueryClient) {
  await queryClient.prefetchQuery<DogData[]>({
    queryKey: [queryKeys.GET_DOGS],
    queryFn: getDogs,
  });
}
