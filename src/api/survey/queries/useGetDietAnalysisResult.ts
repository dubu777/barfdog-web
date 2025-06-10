import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getDietAnalysisResult } from "../survey";
import { queryKeys } from "@/constants/queryKeys";
import { RecipeData, UseSuspenseQueryCustomOptions } from "@/types";

export function useGetDietAnalysisResult(
  id: number,
  queryOptions?: UseSuspenseQueryCustomOptions<RecipeData>
) {
  return useSuspenseQuery({
    queryFn: () => getDietAnalysisResult(Number(id)),
    queryKey: [
      queryKeys.DIET_ANALYSIS.BASE,
      queryKeys.DIET_ANALYSIS.GET_DIET_ANALYSIS_RESULT,
      id,
    ],
    ...queryOptions,
  });
}

export async function prefetchGetDietAnalysisResult(
  queryClient: QueryClient,
  id: number
) {
  await queryClient.prefetchQuery({
    queryFn: () => getDietAnalysisResult(Number(id)),
    queryKey: [
      queryKeys.DIET_ANALYSIS.BASE,
      queryKeys.DIET_ANALYSIS.GET_DIET_ANALYSIS_RESULT,
      id,
    ],
  });
}
