import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ArticleDetail from "@/components/pages/community/article/detail/ArticleDetail";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetArticleDetail } from "@/api/community/queries/prefetchGetArticleDetail";

interface ArticleDetailPageProps {
  params: Promise<{
    articleId: string;
  }>;
  searchParams: Promise<{
    category: string;
  }>;
}

export default async function ArticleDetailPage({ params, searchParams }: ArticleDetailPageProps) {
  const { articleId } = await params;
  const { category } = await searchParams;
  const queryClient = new QueryClient();
  await prefetchGetArticleDetail(queryClient, Number(articleId));
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ArticleDetail articleId={Number(articleId)} category={category} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
