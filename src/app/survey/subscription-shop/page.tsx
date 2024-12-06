import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as styles from "../../survey/Survey.css";
import { prefetchGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { prefetchGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import SubscriptionShopContent from "@/components/pages/subscriptionShop/subscriptionShopContent/SubscriptionShopContent";

interface SubscriptionShopPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SubscriptionShopPage({
  searchParams,
}: SubscriptionShopPageProps) {
  const reportId = Number(searchParams.id);
  const queryClient = new QueryClient();

  // 서버에서 데이터 prefetching
  await prefetchGetSurveyRecipe(queryClient, reportId);
  await prefetchGetSurveyResult(queryClient, reportId);
  // 데이터 직렬화해서 클라이언트에 전달
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.subscribeShopContainer}>
      <Header type="withBackButton" />
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <SubscriptionShopContent reportId={reportId} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
      <BottomNavBar />
    </div>
  );
}