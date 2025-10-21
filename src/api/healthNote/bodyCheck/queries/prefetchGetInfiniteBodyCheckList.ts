import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getInfiniteBodyCheckList } from "../bodyCheck";
import { createSSRRequest } from "@/api/withAuthSSR";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteBodyCheckList(
  petId: number,
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.BODY_CHECK.BASE,
      queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST,
      petId,
      'gastro',
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getInfiniteBodyCheckList(
        petId,
        'gastro',
        pageParam,
        10,
        instance
      ),
  }, ssrAxios);
}
