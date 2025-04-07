import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetArticleDetail } from "@/api/community/queries/useGetArticleDetail";
import ArticleDetail from "@/components/pages/community/article/articleDetail/ArticleDetail";

interface NoticeDetailPageProps {
  params: { articleId: string };
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const articleId = Number(params.articleId);
  const queryClient = new QueryClient();
  await prefetchGetArticleDetail(queryClient, articleId);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상세 공지사항이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ArticleDetail articleId={articleId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
