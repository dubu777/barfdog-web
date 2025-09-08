import { QueryClient } from "@tanstack/react-query";
import { UserInfo } from "@/types";
import { getUserInfo } from "@/api/auth/auth";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetUserInfo(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<UserInfo | null>({
		queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO],
		queryFn: () => getUserInfo(ssrAxios),
	})
}