import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getInfiniteBodyCheckList } from "../bodyCheck";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetInfiniteBodyCheckList(
  petId: number,
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      queryKeys.BODY_CHECK.BASE,
      queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST,
      petId,
      'gastro',
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getInfiniteBodyCheckList(
        petId,
        'gastro',
        pageParam,
        10,
        ssrAxios
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
