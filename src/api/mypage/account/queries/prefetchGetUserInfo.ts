import { QueryClient } from "@tanstack/react-query";
import { UserInfo } from "@/types/mypage/account";
import { getUserInfo } from "../account";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetUserInfo(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return await queryClient.prefetchQuery<UserInfo | null>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ACCOUNT.BASE, queryKeys.MYPAGE.ACCOUNT.GET_USER_INFO],
		queryFn: () => getUserInfo(ssrAxios),
	})
}