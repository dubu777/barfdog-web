import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetBlogArticleList } from "@/api/community/queries/useGetBlogArticleList";
import { prefetchGetBlogList } from "@/api/community/queries/useGetBlogList";
import BlogList from "@/components/pages/community/blog/blogList/BlogList";

export default async function BlogPage() {
  const queryClient = new QueryClient();
  await prefetchGetBlogArticleList(queryClient);
  await prefetchGetBlogList(queryClient, 'all', 0);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>블로그가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}