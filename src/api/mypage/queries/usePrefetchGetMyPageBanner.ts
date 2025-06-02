import { QueryClient } from "@tanstack/react-query";
import { MyPageBannerData } from "@/types";
import { queryKeys } from "@/constants";
import { getMyPageBanner } from "@/api/mypage/mypage";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetMyPageBanner(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<MyPageBannerData>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_BANNER],
		queryFn: () => getMyPageBanner(ssrAxios),
	});
}