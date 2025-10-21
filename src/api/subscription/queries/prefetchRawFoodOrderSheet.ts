import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getRawFoodOrderSheet } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetRawFoodOrderSheet(
  queryClient: QueryClient,
  reportId: number
) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_RAW_ORDER_SHEET,
      reportId,
    ],
    queryFn: () => getRawFoodOrderSheet(reportId, ssrAxios),
  });
}
