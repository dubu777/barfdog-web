import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getInfiniteFullCheckList } from "../fullCheck";
import { createSSRRequest } from "@/api/withAuthSSR";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteFullCheckList(
  petId: number,
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_LIST,
      petId,
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getInfiniteFullCheckList({
        petId,
        pageParam,
        size: 10,
        instance
      }),
  }, ssrAxios);
}
