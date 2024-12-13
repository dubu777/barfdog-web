import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { BenefitDto } from "@/types";
import { getPackageBenefits } from "@/api/subscription/subscription";

export { useGetPackageBenefits, prefetchGetPackageBenefits };

function useGetPackageBenefits(subscribeId: string) {
  const queryClient = useQueryClient();
  return useSuspenseQuery<BenefitDto[]>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_PACKAGE_BENEFITS, subscribeId],
    queryFn: () => getPackageBenefits(subscribeId),
    initialData: () => queryClient.getQueryData([queryKeys.SUBSCRIPTION, queryKeys.GET_PACKAGE_BENEFITS, subscribeId]),
  })
}

async function prefetchGetPackageBenefits(queryClient: QueryClient, subscribeId: string) {
await queryClient.prefetchQuery<BenefitDto[]>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_PACKAGE_BENEFITS, subscribeId],
    queryFn: () => getPackageBenefits(subscribeId),
  });
}
