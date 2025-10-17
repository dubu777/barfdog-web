import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { getOrderListByOrderType } from "@/api/mypage/orders/order";
import { OrderType } from "@/types/mypage/orders";

export async function prefetchGetInfiniteOrderList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ORDERS.BASE, queryKeys.MYPAGE.ORDERS.GET_ORDER_LIST, 'SUBSCRIPTION'],
    queryFn: async ({ pageParam = 0 }) =>
      await getOrderListByOrderType({
        pageParam,
        orderType: 'SUBSCRIPTION' as OrderType,
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
