import { QueryClient } from "@tanstack/react-query";
import { MyPageInfoData } from "@/types";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getMyPageInfo } from "@/api/mypage/common/common";

export async function prefetchGetMyPageInfo(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return await queryClient.prefetchQuery<MyPageInfoData>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_MYPAGE_INFO],
		queryFn: () => getMyPageInfo(ssrAxios),
	});
}