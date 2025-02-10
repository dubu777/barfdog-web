import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { NoticeDetail, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getNoticeDetail } from "@/api/community/community";

export { useGetNoticeDetail, prefetchGetNoticeDetail };

function useGetNoticeDetail(noticeId: number, queryOptions?: UseSuspenseQueryCustomOptions<NoticeDetail>) {
  return useSuspenseQuery<NoticeDetail>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_DETAIL, noticeId],
    queryFn: () => getNoticeDetail(noticeId),
    ...queryOptions,
  })
}

async function prefetchGetNoticeDetail(queryClient: QueryClient, noticeId: number) {
  return queryClient.prefetchQuery<NoticeDetail>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_DETAIL, noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  })
}