import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getInfiniteFullCheckList } from "../fullCheck";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetInfiniteFullCheckList(
  petId: number,
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_LIST,
      petId,
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getInfiniteFullCheckList({
        petId,
        pageParam,
        size: 10,
        instance: ssrAxios
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
