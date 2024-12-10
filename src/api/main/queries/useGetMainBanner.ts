import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getMainDeadlineBanner } from "@/api/main/main";

export { useGetMainDeadlineBanner, prefetchGetMainDeadlineBanner }

const getMainBannerQueryKey = [queryKeys.MAIN, queryKeys.GET_MAIN_DEADLINE_BANNER];

function useGetMainDeadlineBanner() {
  const queryClient = useQueryClient();
  return useQuery<string>({
    queryKey: getMainBannerQueryKey,
    queryFn: getMainDeadlineBanner,
    initialData: () => queryClient.getQueryData(getMainBannerQueryKey),
  })
}

async function prefetchGetMainDeadlineBanner(queryClient: QueryClient) {
  await queryClient.prefetchQuery<string>({
    queryKey: getMainBannerQueryKey,
    queryFn: getMainDeadlineBanner,
  });
}