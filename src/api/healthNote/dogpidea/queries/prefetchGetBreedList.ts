import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getBreedList } from "../dogpidea";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetBreedList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryFn: () => getBreedList(ssrAxios),
    queryKey: [
      queryKeys.DOGPEDIA.BASE,
      queryKeys.DOGPEDIA.GET_BREED_LIST,
    ],
  });
}
