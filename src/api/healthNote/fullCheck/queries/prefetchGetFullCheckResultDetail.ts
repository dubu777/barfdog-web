import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getFullCheckResultDetail } from "../fullCheck";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetFullCheckResultDetail(diagnosisId: number, queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryFn: () => getFullCheckResultDetail(diagnosisId, ssrAxios),
    queryKey: [
      queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_RESULT_DETAIL,
      diagnosisId,
    ],
  });
}
