import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { RecipeDto } from "@/types";
import { queryKeys } from "@/constants";
import { getRecipeList } from "@/api/recipes/recipes";

export { useGetRecipeList, prefetchGetRecipeList }

const getRecipeListQueryKey = [queryKeys.RECIPE, queryKeys.GET_RECIPE_LIST];

function useGetRecipeList() {
  const queryClient = useQueryClient();
  return useQuery<RecipeDto[]>({
    queryKey: getRecipeListQueryKey,
    queryFn: getRecipeList,
    initialData: () => queryClient.getQueryData(getMainBannerQueryKey),
  });
}

async function prefetchGetRecipeList(queryClient: QueryClient) {
  await queryClient.prefetchQuery<RecipeDto[]>({
    queryKey: getRecipeListQueryKey,
    queryFn: getRecipeList,
  });
}