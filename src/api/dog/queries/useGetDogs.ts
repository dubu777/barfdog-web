import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getDogs } from "@/api/dog/dogs";
import { DogData } from "@/types/dogs";

export { useGetDogs, prefetchGetDogs };

function useGetDogs() {
  const queryClient = useQueryClient();

  return useSuspenseQuery<DogData[]>({
    queryKey: [queryKeys.GET_DOGS],
    queryFn: getDogs,
    initialData: () => queryClient.getQueryData([queryKeys.GET_DOGS]),
  });
}

async function prefetchGetDogs(queryClient: QueryClient) {
  await queryClient.prefetchQuery<DogData[]>({
    queryKey: [queryKeys.GET_DOGS],
    queryFn: getDogs,
  });
}