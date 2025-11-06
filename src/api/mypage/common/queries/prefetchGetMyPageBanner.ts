import { QueryClient } from "@tanstack/react-query";
import { MyPageBannerData } from "@/types";
import { queryKeys } from "@/constants";
import { getMyPageBanner } from "@/api/mypage/common/common";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetMyPageBanner(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return await queryClient.prefetchQuery<MyPageBannerData>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_MYPAGE_BANNER],
		queryFn: () => getMyPageBanner(ssrAxios),
	});
}