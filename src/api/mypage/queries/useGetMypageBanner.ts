import { queryKeys } from "@/constants";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getMyPageBanner } from "@/api/mypage/mypage";
import { MyPageBannerData, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetMyPageBanner, prefetchGetMyPageBanner }

const getMyPageBannerQueryKey = [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_BANNER];

function useGetMyPageBanner(queryOptions?: UseSuspenseQueryCustomOptions<MyPageBannerData>){
  return useSuspenseQuery<MyPageBannerData>({
    queryKey: getMyPageBannerQueryKey,
    queryFn: getMyPageBanner,
    ...queryOptions,
  });
}

async function prefetchGetMyPageBanner(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MyPageBannerData>({
    queryKey: getMyPageBannerQueryKey,
    queryFn: getMyPageBanner,
  });
}