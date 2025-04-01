import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetBlogDetail } from "@/api/community/queries/useGetBlogDetail";
import BlogDetail from "@/components/pages/community/blog/blogDetail/BlogDetail";

interface NoticeDetailPageProps {
  params: { blogId: string };
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const blogId = Number(params.blogId);
  const queryClient = new QueryClient();
  await prefetchGetBlogDetail(queryClient, blogId);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상세 공지사항이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogDetail blogId={blogId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
