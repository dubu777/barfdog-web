import { SnSProvider, UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getConnectedSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";

export { useGetConnectedSns, prefetchGetConnectedSns };

const getConnectedSnsQueryKey = [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_CONNECTED_SNS];

function useGetConnectedSns(queryOptions?: UseSuspenseQueryCustomOptions<SnSProvider | null>) {
	return useSuspenseQuery<SnSProvider | null>({
		queryKey: getConnectedSnsQueryKey,
		queryFn: getConnectedSns,
		...queryOptions,
	})
}

async function prefetchGetConnectedSns(queryClient: QueryClient) {
	await queryClient.prefetchQuery<SnSProvider | null>({
		queryKey: getConnectedSnsQueryKey,
		queryFn: getConnectedSns,
	})
}