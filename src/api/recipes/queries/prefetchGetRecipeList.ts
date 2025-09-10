import { QueryClient } from "@tanstack/react-query";
import { RecipeDto } from "@/types";
import { queryKeys } from "@/constants";
import { getRecipeList } from "@/api/recipes/recipes";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetRecipeList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery<RecipeDto[]>({
    queryKey: [queryKeys.RECIPE.BASE, queryKeys.RECIPE.GET_RECIPE_LIST],
    queryFn: () => getRecipeList(ssrAxios),
  });
}