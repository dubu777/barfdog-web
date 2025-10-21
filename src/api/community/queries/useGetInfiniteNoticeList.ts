import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getNoticeList } from "@/api/community/community";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteNoticeList() {
  return useInfiniteQuery(createInfiniteQueryConfig({
    queryKey: [queryKeys.COMMUNITY.NOTICE.BASE, queryKeys.COMMUNITY.NOTICE.GET_NOTICE_LIST],
    queryFn: async ({ pageParam }) => {
      return await getNoticeList({ pageParam, size: 20 });
    },
  }));
}