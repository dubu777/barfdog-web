import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ReviewDetail from "@/components/pages/mypage/review/reviewDetail/ReviewDetail";
import { prefetchGetReviewDetail } from "@/api/review/queries/useGetReviewDetail";
import { ReviewItemType } from "@/types";

interface ReviewDetailPageProps {
  params: { reviewId: string };
  searchParams: { reviewType: string }
}

export default async function ReviewDetailPage({ params, searchParams }: ReviewDetailPageProps) {
  const reviewId = Number(params.reviewId);
  const reviewType = searchParams.reviewType;

  const queryClient = new QueryClient();
  await prefetchGetReviewDetail(queryClient, reviewId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상세 리뷰가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewDetail reviewId={reviewId} reviewType={reviewType as ReviewItemType} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
