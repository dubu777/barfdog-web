import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DogListData } from "@/types";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getDogList } from "@/api/dog/dog";

export async function prefetchGetDogList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery<DogListData[]>({
    queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST],
    queryFn: async () => getDogList(ssrAxios),
  });
}