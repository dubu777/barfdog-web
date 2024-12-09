import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getSurveyResult } from "../../survey/survey";


export function useGetSurveyResult(id: number) {
  return useSuspenseQuery({
    queryKey: [queryKeys.SURVEY, queryKeys.GET_SURVEY_RESULT, id],
    queryFn: () => getSurveyResult(Number(id)),
  })
}

export async function prefetchGetSurveyResult(queryClient: QueryClient, id: number) {
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.SURVEY, queryKeys.GET_SURVEY_RESULT, id],
      queryFn: () => getSurveyResult(Number(id)),
    });
}
