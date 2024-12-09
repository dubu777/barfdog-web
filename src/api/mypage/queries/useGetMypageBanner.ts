import {queryKeys} from "@/constants";
import {QueryClient, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {getMyPageBanner} from "@/api/mypage/myPage";
import {MyPageBannerData} from "@/types";

export { useGetMyPageBanner, prefetchGetMyPageBanner }

function useGetMyPageBanner() {
  const queryClient = useQueryClient();
  return useSuspenseQuery<MyPageBannerData>({
    queryKey: [queryKeys.MYPAGE, queryKeys.GET_MYPAGE_BANNER],
    queryFn: getMyPageBanner,
    initialData: () => queryClient.getQueryData([queryKeys.MYPAGE, queryKeys.GET_MYPAGE_BANNER]),
  });
}

async function prefetchGetMyPageBanner(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MyPageBannerData>({
    queryKey: [queryKeys.MYPAGE, queryKeys.GET_MYPAGE_BANNER],
    queryFn: getMyPageBanner,
  });
}