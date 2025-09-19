import { SnSProvider, UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getConnectedSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";

export function useGetConnectedSns(queryOptions?: UseSuspenseQueryCustomOptions<SnSProvider | null>) {
	return useSuspenseQuery<SnSProvider | null>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_CONNECTED_SNS],
		queryFn: () => getConnectedSns(),
		...queryOptions,
	})
}
