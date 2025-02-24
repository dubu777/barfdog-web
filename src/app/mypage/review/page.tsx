import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";
import { prefetchGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";
import ReviewList from "@/components/pages/mypage/review/ReviewList";

export default async function ReviewPage() {
  const queryClient = new QueryClient();
  await prefetchGetWritableReviewList(queryClient, 0);
  await prefetchGetWrittenReviewList(queryClient, 0);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      {/*<ErrorBoundary fallback={<div>작성 가능한 리뷰가 없습니다.</div>}>*/}
      {/*  <Suspense fallback={<div>Loading...</div>}>*/}
          <ReviewList />
        {/*</Suspense>*/}
      {/*</ErrorBoundary>*/}
    </HydrationBoundary>
  )
}
