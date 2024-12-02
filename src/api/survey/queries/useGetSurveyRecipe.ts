import { QueryClient, useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { getSurveyRecipe } from "../../survey/survey";
import { queryKeys } from "@/constants/queryKeys";
import { RecipeData, UseSuspenseQueryCustomOptions } from "@/types";


export function useGetSurveyRecipe(id: number, queryOptions?: UseSuspenseQueryCustomOptions<RecipeData>) {
  return useSuspenseQuery({
    queryFn: () => getSurveyRecipe(Number(id)),
    queryKey: [queryKeys.SURVEY, queryKeys.GET_SURVEY_RECIPE, id],
    ...queryOptions,
  })
}

export async function prefetchGetSurveyRecipe(queryClient: QueryClient, id: number) {
    await queryClient.prefetchQuery({
      queryFn: () => getSurveyRecipe(Number(id)),
      queryKey: [queryKeys.SURVEY, queryKeys.GET_SURVEY_RECIPE, id],
    });
}
