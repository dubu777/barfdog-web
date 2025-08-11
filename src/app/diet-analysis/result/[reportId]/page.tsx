import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "@/components/layout/header/Header";
import { prefetchGetDietAnalysisResult } from "@/api/dietAnalysis/queries/usePrefetchGetDietAnalysisResult";
import DietAnalysisResult from "@/components/pages/dietAnalysis/result/DietAnalysisResult";

type Params = { reportId: string };

export default async function ResultPage({ params }: { params: Params }) {
  const reportId = Number(params.reportId);
  const queryClient = new QueryClient();

  // 서버에서 데이터 prefetching
  await prefetchGetDietAnalysisResult(queryClient, reportId);
  // 데이터 직렬화해서 클라이언트에 전달
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      {/* 재시도 버튼 개발 예정 */}
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<div>Loading...</div>}>
          <Header showBackButton />
          <DietAnalysisResult reportId={reportId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
