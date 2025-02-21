import { GetUserInfo, UseQueryCustomOptions } from "@/types";
import { QueryClient , useQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getUserInfo } from "@/api/auth/auth";

export { useGetUserInfo, prefetchGetUserInfo };

const getUserInfoQueryKey = [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO];

function useGetUserInfo(queryOptions?: UseQueryCustomOptions<GetUserInfo>) {
	return useQuery<GetUserInfo>({
		queryKey: getUserInfoQueryKey,
		queryFn: getUserInfo,
		...queryOptions,
	})
}
async function prefetchGetUserInfo(queryClient: QueryClient) {
	await queryClient.prefetchQuery<GetUserInfo>({
		queryKey: getUserInfoQueryKey,
		queryFn: getUserInfo,
	})
}