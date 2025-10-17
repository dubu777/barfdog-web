import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ReviewSection from "@/components/pages/review/list/ReviewSection";
import { prefetchGetBestReviewList } from "@/api/review/queries/prefetchGetBestReviewList";
import { prefetchGetInfiniteReviewList } from "@/api/review/queries/prefetchGetInfiniteReviewList";

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetBestReviewList(queryClient);
  await prefetchGetInfiniteReviewList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewSection />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}