import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getDietAnalysisResult } from "../dietAnalysis";
import { DietAnalysisResult } from "@/types/dietAnalysis";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetDietAnalysisResult(
  reportId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<DietAnalysisResult>
) {
  return useSuspenseQuery({
    queryFn: () => getDietAnalysisResult(reportId),
    queryKey: [
      queryKeys.DIET_ANALYSIS.BASE,
      queryKeys.DIET_ANALYSIS.GET_DIET_ANALYSIS_RESULT,
      reportId,
    ],
    ...queryOptions,
  });
}
