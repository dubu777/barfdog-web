import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { NoticeList, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getNoticeList } from "@/api/community/community";

export { useGetNoticeList, prefetchGetNoticeList };

function useGetNoticeList(page: number, queryOptions?: UseSuspenseQueryCustomOptions<NoticeList>) {
  return useSuspenseQuery<NoticeList>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_LIST, page],
    queryFn: () => getNoticeList(page),
    keepPreviousData: true,
    staleTime: 100 * 60 * 5, // 5분
    ...queryOptions,
  })
}

async function prefetchGetNoticeList(queryClient: QueryClient, page: number) {
  return queryClient.prefetchQuery<NoticeList>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_LIST, page],
    queryFn: () => getNoticeList(page),
  })
}