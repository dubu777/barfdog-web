import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { getOrderListByOrderType } from "@/api/mypage/orders/order";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteOrderList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
			queryKeys.MYPAGE.BASE, 
			queryKeys.MYPAGE.ORDERS.BASE, 
			queryKeys.MYPAGE.ORDERS.GET_ORDER_LIST, 
			'SUBSCRIPTION'
		],
    queryFn: async ({ pageParam, instance }) =>
      await getOrderListByOrderType({
        pageParam,
        orderType: 'SUBSCRIPTION',
        instance
      }),
  }, ssrAxios);
}
