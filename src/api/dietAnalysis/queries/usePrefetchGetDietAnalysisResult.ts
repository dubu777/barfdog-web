import { queryKeys } from "@/constants";
import { getDietAnalysisResult } from "../dietAnalysis";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetDietAnalysisResult(
  queryClient: QueryClient,
  id: number
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getDietAnalysisResult(Number(id), ssrAxios),
    queryKey: [
      queryKeys.DIET_ANALYSIS.BASE,
      queryKeys.DIET_ANALYSIS.GET_DIET_ANALYSIS_RESULT,
      id,
    ],
  });
}
