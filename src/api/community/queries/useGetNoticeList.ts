import { useInfiniteQuery } from "@tanstack/react-query";
import { NoticeListResponse } from "@/types";
import { queryKeys } from "@/constants";
import { getNoticeList } from "@/api/community/community";

export function useGetNoticeList() {
  return useInfiniteQuery<NoticeListResponse>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_LIST],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getNoticeList({ pageParam: pageNumber, size: 20 });
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.page) return undefined;

      const nextPage = lastPage.page.number + 1;
      const totalPages = lastPage.page.totalPages;

      return nextPage < totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  })
}