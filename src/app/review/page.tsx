import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ReviewList from "@/components/pages/review/reviewList/ReviewList";
import { prefetchGetReviewList } from "@/api/review/queries/prefetchGetReviewList";
import { prefetchGetBestReviewList } from "@/api/review/queries/prefetchGetBestReviewList";

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetBestReviewList(queryClient);
  await prefetchGetReviewList(queryClient);
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