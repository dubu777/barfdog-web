import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ArticleList from "@/components/pages/community/article/list/ArticleList";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import {
  prefetchGetArticleList,
  prefetchGetRecommendArticleList,
} from "@/api/community/queries/prefetchGetArticleList";

export default async function ArticlePage() {
  const queryClient = new QueryClient();
  await prefetchGetRecommendArticleList(queryClient);
  await prefetchGetArticleList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ArticleList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
