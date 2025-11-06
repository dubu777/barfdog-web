import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { getNoticeList } from "@/api/community/community";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteNoticeList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_LIST],
    queryFn: async ({ pageParam, instance }) =>
      await getNoticeList({
        pageParam,
        instance
      }),
  }, ssrAxios);
}
