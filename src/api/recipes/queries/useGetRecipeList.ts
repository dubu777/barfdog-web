import { useQuery } from "@tanstack/react-query";
import { RecipeItem, UseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getRecipeList } from "@/api/recipes/recipes";

export function useGetRecipeList(queryOptions?: UseQueryCustomOptions<RecipeItem[]>) {
  return useQuery<RecipeItem[]>({
    queryKey: [queryKeys.RECIPE.BASE, queryKeys.RECIPE.GET_RECIPE_LIST],
    queryFn: () => getRecipeList(),
    ...queryOptions,
  });
}