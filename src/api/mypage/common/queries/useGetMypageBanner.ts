import { queryKeys } from "@/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyPageBanner } from "@/api/mypage/common/common";
import { MyPageBannerData, UseSuspenseQueryCustomOptions } from "@/types";

export function useGetMyPageBanner(queryOptions?: UseSuspenseQueryCustomOptions<MyPageBannerData>){
  return useSuspenseQuery<MyPageBannerData>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_BANNER],
    queryFn: () => getMyPageBanner(),
    ...queryOptions,
  });
}