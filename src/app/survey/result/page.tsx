import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as styles from "../../../components/pages/survey/surveyPageContainer/Survey.css";
import SurveyResult from "@/components/pages/result/surveyResult/SurveyResult";
import { prefetchGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import Header from "@/components/layout/header/Header";


export default async function ResultPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const reportId = Number(searchParams.reportId);
  const queryClient = new QueryClient();

  // 서버에서 데이터 prefetching
  await prefetchGetSurveyResult(queryClient, reportId);
  // 데이터 직렬화해서 클라이언트에 전달
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.subscribeShopContainer}>
      <Header showBackButton /> 
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <SurveyResult reportId={reportId}/>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
      <BottomNavBar />
    </div>
  );
}
