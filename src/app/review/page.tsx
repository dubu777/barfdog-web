import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";
import { prefetchGetReviewList } from "@/api/review/queries/useGetReviewList";
import ReviewList from "@/components/pages/reivew/reviewList/ReviewList";

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetBestReviewList(queryClient);
  await prefetchGetReviewList(queryClient, 0);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}