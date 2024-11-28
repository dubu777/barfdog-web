import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getSurveyRecipe } from "../survey";
import { queryKeys } from "@/constants/queryKeys";


export function useGetSurveyRecipe(id: number) {
  return useSuspenseQuery({
    queryKey: [queryKeys.SURVEY, queryKeys.GET_SURVEY_RECIPE, id],
    queryFn: () => getSurveyRecipe(Number(id)),
  })
}

export async function prefetchGetSurveyRecipe(queryClient: QueryClient, id: number) {
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.SURVEY, queryKeys.GET_SURVEY_RECIPE, id],
      queryFn: () => getSurveyRecipe(Number(id)),
    });
}
