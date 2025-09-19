import { SnsProvider, UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getConnectedSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";

export function useGetConnectedSns(
  queryOptions?: UseSuspenseQueryCustomOptions<SnsProvider | null>
) {
  return useSuspenseQuery<SnsProvider | null>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_CONNECTED_SNS],
    queryFn: () => getConnectedSns(),
    ...queryOptions,
  });
}
