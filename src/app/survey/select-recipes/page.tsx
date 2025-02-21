import Header from "@/components/layout/header/Header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { prefetchGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import SelectRecipeContainer2 from "@/components/pages/subscription/subscriptionContainer/SubscriptionContainer2";

interface SelectRecipesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SelectRecipesPage({
  searchParams,
}: SelectRecipesPageProps) {
  const reportId = Number(searchParams.id);
  const queryClient = new QueryClient();

  // 서버에서 데이터 prefetching
  await prefetchGetSurveyRecipe(queryClient, reportId);
  await prefetchGetSurveyResult(queryClient, reportId);
  // 데이터 직렬화해서 클라이언트에 전달
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <Header type="backButtonOnly" />
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <SelectRecipeContainer2 reportId={reportId} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
