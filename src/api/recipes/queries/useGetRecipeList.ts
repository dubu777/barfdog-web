import { useQuery } from "@tanstack/react-query";
import { RecipeDto, UseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getRecipeList } from "@/api/recipes/recipes";

export function useGetRecipeList(queryOptions?: UseQueryCustomOptions<RecipeDto[]>) {
  return useQuery<RecipeDto[]>({
    queryKey: [queryKeys.RECIPE.BASE, queryKeys.RECIPE.GET_RECIPE_LIST],
    queryFn: () => getRecipeList(),
    ...queryOptions,
  });
}