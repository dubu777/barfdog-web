import { QueryClient, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getMainDeadlineBanner } from "@/api/main/main";

export { useGetMainDeadlineBanner, prefetchGetMainDeadlineBanner }

const getMainBannerQueryKey = [queryKeys.MAIN.BASE, queryKeys.MAIN.GET_MAIN_DEADLINE_BANNER];

function useGetMainDeadlineBanner(queryOptions?: UseQueryOptions<string>) {
  return useQuery<string>({
    queryKey: getMainBannerQueryKey,
    queryFn: getMainDeadlineBanner,
    ...queryOptions,
  })
}

async function prefetchGetMainDeadlineBanner(queryClient: QueryClient) {
  await queryClient.prefetchQuery<string>({
    queryKey: getMainBannerQueryKey,
    queryFn: getMainDeadlineBanner,
  });
}