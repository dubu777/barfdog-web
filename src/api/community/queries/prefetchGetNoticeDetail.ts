import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { getNoticeDetail } from "@/api/community/community";
import { NoticeDetail } from "@/types";

export async function prefetchGetNoticeDetail(queryClient: QueryClient, noticeId: number) {
  const ssrAxios = createSSRRequest();
  return queryClient.prefetchQuery<NoticeDetail>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_DETAIL, noticeId],
    queryFn: () => getNoticeDetail(noticeId, ssrAxios),
  })
}