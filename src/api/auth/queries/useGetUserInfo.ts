import { UserInfo, UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getUserInfo } from "@/api/auth/auth";

export function useGetUserInfo(queryOptions?: UseSuspenseQueryCustomOptions<UserInfo | null>) {
	return useSuspenseQuery<UserInfo | null>({
		queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO],
		queryFn: () => getUserInfo(),
		...queryOptions,
	})
}