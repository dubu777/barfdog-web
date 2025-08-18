import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getFullCheckSummary } from "../fullCheck";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetFullCheckSummary(petId: number, queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getFullCheckSummary(petId, ssrAxios),
    queryKey: [
      queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_SUMMARY,
      petId,
    ],
  });
}
