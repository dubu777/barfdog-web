import { useInfiniteQuery } from "@tanstack/react-query";
import { NoticeList } from "@/types";
import { queryKeys } from "@/constants";
import { getNoticeList } from "@/api/community/community";

export function useGetNoticeList() {
  return useInfiniteQuery<NoticeList>({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_LIST],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getNoticeList({ pageParam: pageNumber, size: 20 });
      return data;
    },
    getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.pagination?.page ?? 0;
			const totalPages = lastPage?.pagination?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
    initialPageParam: 0,
  })
}