import { prefetchGetRawFoodOrderSheet } from "@/api/subscription/queries/usePrefetchRawFoodOrderSheet";
import Spinner from "@/components/common/spinner/Spinner";
import SubscribePageContainer from "@/components/pages/subscribe/SubscribePageContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Params = { reportId: string };

export default async function SubscribePage({ params }: { params: Params }) {
  const reportId = Number(params.reportId);

  const queryClient = new QueryClient();
  // 서버에서 데이터 prefetching
  await prefetchGetRawFoodOrderSheet(queryClient, reportId);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      {/* 재시도 버튼 개발 예정 */}
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscribePageContainer reportId={reportId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
