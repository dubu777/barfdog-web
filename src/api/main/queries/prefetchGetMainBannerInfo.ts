import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getMainBannerInfo } from "../main";

export async function prefetchGetMainBannerInfo(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.MAIN.BASE, queryKeys.MAIN.GET_MAIN_BANNER_INFO],
    queryFn: () => getMainBannerInfo(ssrAxios),
  });
}
