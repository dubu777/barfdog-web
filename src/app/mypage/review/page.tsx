import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";
import { prefetchGetWritableReviewList } from "@/api/review/queries/usePrefetchGetWritableReviewList";
import { prefetchGetWrittenReviewList } from "@/api/review/queries/usePrefetchGetWrittenReviewList";
import ReviewList from "@/components/pages/mypage/review/ReviewList";
import EmptyStateReview from "@/components/pages/mypage/common/emptyState/emptyState/EmptyState";

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetWritableReviewList(queryClient);
  await prefetchGetWrittenReviewList(queryClient);
  await prefetchGetStoreItemList(queryClient, 0, 'recent', 'TOPPING', 100);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<EmptyStateReview />}>
        <Suspense fallback={<EmptyStateReview />}>
          <ReviewList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
