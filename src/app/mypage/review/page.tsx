import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetInfiniteMypageReviewList } from "@/api/mypage/review/queries/prefetchGetInfiniteMypageReviewList";
import ReviewList from "@/components/pages/mypage/review/ReviewList";
import Spinner from "@/components/common/spinner/Spinner";

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteMypageReviewList('writable', queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰 목록 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ReviewList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
