import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "@/components/ui/spinner/Spinner";
import PromotionList from "@/components/pages/mypage/promotion/list/PromotionList";
import { prefetchGetInfinitePromotionList } from "@/api/mypage/promotion/queries/prefetchGetInfinitePromotionList";

export default async function PromotionPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfinitePromotionList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>사용 가능한 프로모션이 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <PromotionList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
