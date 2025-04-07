import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetRecommendArticleList } from "@/api/community/queries/useGetRecommendArticleList";
import { prefetchGetArticleList } from "@/api/community/queries/useGetArticleList";
import ArticleList from "@/components/pages/community/article/articleList/ArticleList";

export default async function ArticlePage() {
  const queryClient = new QueryClient();
  await prefetchGetRecommendArticleList(queryClient);
  await prefetchGetArticleList(queryClient, 'ALL', 0);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>아티클이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ArticleList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}