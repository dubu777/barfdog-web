import { QueryClient, useQuery } from "@tanstack/react-query";
import {RecipeDto, UseQueryCustomOptions} from "@/types";
import { queryKeys } from "@/constants";
import { getRecipeList } from "@/api/recipes/recipes";

export { useGetRecipeList, prefetchGetRecipeList }

const getRecipeListQueryKey = [queryKeys.RECIPE.BASE, queryKeys.RECIPE.GET_RECIPE_LIST];

function useGetRecipeList(queryOptions?: UseQueryCustomOptions<RecipeDto[]>) {
  return useQuery<RecipeDto[]>({
    queryKey: getRecipeListQueryKey,
    queryFn: getRecipeList,
    ...queryOptions,
  });
}

async function prefetchGetRecipeList(queryClient: QueryClient) {
  await queryClient.prefetchQuery<RecipeDto[]>({
    queryKey: getRecipeListQueryKey,
    queryFn: getRecipeList,
  });
}