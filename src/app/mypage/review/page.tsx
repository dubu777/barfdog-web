import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";
import { prefetchGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";
import { prefetchGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";
import ReviewList from "@/components/pages/mypage/review/ReviewList";
import EmptyStateReview from "@/components/pages/mypage/review/emptyStateReview/EmptyStateReview";

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
