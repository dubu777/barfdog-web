import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Recipes from "@/components/pages/recipes/Recipes";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetRecipeList } from "@/api/recipes/queries/prefetchGetRecipeList";

export default async function RecipesPage() {
  const queryClient = new QueryClient();
  await prefetchGetRecipeList(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <Recipes />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
