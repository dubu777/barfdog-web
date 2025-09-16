import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ArticleDetail from "@/components/pages/community/article/detail/ArticleDetail";
import Spinner from "@/components/common/spinner/Spinner";
import { prefetchGetArticleDetail } from "@/api/community/queries/prefetchGetArticleDetail";

interface ArticleDetailPageProps {
  params: Promise<{
    articleId: string;
  }>;
}
export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { articleId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetArticleDetail(queryClient, Number(articleId));
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상세 아티클이 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ArticleDetail articleId={Number(articleId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
