import { GetUserInfo, UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getUserInfo } from "@/api/auth/auth";

export { useGetUserInfo, prefetchGetUserInfo };

const getUserInfoQueryKey = [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO];

function useGetUserInfo(queryOptions?: UseSuspenseQueryCustomOptions<GetUserInfo | null>) {
	return useSuspenseQuery<GetUserInfo | null>({
		queryKey: getUserInfoQueryKey,
		queryFn: getUserInfo,
		...queryOptions,
	})
}
async function prefetchGetUserInfo(queryClient: QueryClient) {
	await queryClient.prefetchQuery<GetUserInfo | null>({
		queryKey: getUserInfoQueryKey,
		queryFn: getUserInfo,
	})
}