import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getSurveyResult } from "../../survey/survey";
import { ResultData, UseSuspenseQueryCustomOptions } from "@/types";

export function useGetSurveyResult(id: number, queryOptions?: UseSuspenseQueryCustomOptions<ResultData>) {
  return useSuspenseQuery({
    queryFn: () => getSurveyResult(Number(id)),
    queryKey: [queryKeys.SURVEY.BASE, queryKeys.SURVEY.GET_SURVEY_RESULT, id],
    ...queryOptions,
  })
}

export async function prefetchGetSurveyResult(queryClient: QueryClient, id: number) {
    await queryClient.prefetchQuery({
      queryFn: () => getSurveyResult(Number(id)),
      queryKey: [queryKeys.SURVEY.BASE, queryKeys.SURVEY.GET_SURVEY_RESULT, id],
    });
}
