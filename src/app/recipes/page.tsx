import Recipes from "@/components/pages/recipes/Recipes";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetRecipeList } from "@/api/recipes/queries/prefetchGetRecipeList";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner/Spinner";

export default async function RecipesPage() {
  const queryClient = new QueryClient();
  await prefetchGetRecipeList(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>레시피 상세 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
					<Recipes />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
