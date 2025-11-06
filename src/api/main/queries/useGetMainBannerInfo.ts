import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { MainBannerInfo } from "@/types/main";
import { getMainBannerInfo } from "@/api/main/main";
import { UseQueryCustomOptions } from "@/types";

export function useGetMainBannerInfo(queryOptions?: UseQueryCustomOptions<MainBannerInfo>) {
  return useQuery<MainBannerInfo>({
    queryKey: [queryKeys.MAIN.BASE, queryKeys.MAIN.GET_MAIN_BANNER_INFO],
    queryFn: () => getMainBannerInfo(),
    ...queryOptions,
  });
}
