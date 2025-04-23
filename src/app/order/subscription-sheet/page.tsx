import { prefetchGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { prefetchGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import SubscriptionSheetPageContainer from "@/components/pages/subscriptionSheet/SubscriptionSheetPageContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface SubscriptionSheetPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SubscriptionSheetPage({
  searchParams,
}: SubscriptionSheetPageProps) {
  const reportId = Number(searchParams.reportId);
  console.log(reportId);

  const queryClient = new QueryClient();
  // 서버에서 데이터 prefetching
  await prefetchGetSurveyRecipe(queryClient, reportId);
  await prefetchGetSurveyResult(queryClient, reportId);
  // 데이터 직렬화해서 클라이언트에 전달
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      {/* 재시도 버튼 개발 예정 */}
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationGuard shouldBlock>
            <SubscriptionSheetPageContainer reportId={reportId} />
          </NavigationGuard>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
