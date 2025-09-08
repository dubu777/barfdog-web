import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Spinner from "@/components/common/spinner/Spinner";
import ReviewDetail from "@/components/pages/mypage/review/detail/ReviewDetail";
import { ReviewItemType, ReviewStatus } from "@/types";
import { prefetchGetReviewDetail } from "@/api/mypage/review/queries/prefetchGetReviewDetail";

interface ReviewDetailPageProps {
  params: Promise<{
    reviewId: string;
  }>
  searchParams: Promise<{
    reviewType: string;
    status: string;
    source?: string;
  }>
}

export default async function ReviewDetailPage({ params, searchParams }: ReviewDetailPageProps) {
  const { reviewId } = await params;
  const { reviewType, status } = await searchParams;

  const queryClient = new QueryClient();
  await prefetchGetReviewDetail(Number(reviewId), queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰 상세 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ReviewDetail
            reviewId={Number(reviewId)}
            reviewType={reviewType as ReviewItemType}
            reviewStatus={status as ReviewStatus}
          />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
