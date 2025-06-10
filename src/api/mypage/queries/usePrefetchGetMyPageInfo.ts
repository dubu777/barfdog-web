import { QueryClient } from "@tanstack/react-query";
import { MyPageInfoData } from "@/types";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getMyPageInfo } from "@/api/mypage/mypage";

export async function prefetchGetMyPageInfo(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<MyPageInfoData>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_INFO],
		queryFn: () => getMyPageInfo(ssrAxios),
	});
}