import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import PackInfo from "@/components/pages/subscribeShop/packInfo/PackInfo";
import PlanSelection from "@/components/pages/subscribeShop/planSelection/PlanSelection";
import RecipeSelection from "@/components/pages/subscribeShop/recipeSelection/RecipeSelection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as styles from "../Survey.css";
import { prefetchGetSurveyRecipe } from "@/api/queries/useGetSurveyRecipe";
import { prefetchGetSurveyResult } from "@/api/queries/useGetSurveyResult";


export default async function SubscribeShopPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const id = Number(searchParams.id);
  const queryClient = new QueryClient();
console.log('searchParams.id', searchParams.id);

  // 서버에서 데이터 prefetching
  await prefetchGetSurveyRecipe(queryClient, id);
  await prefetchGetSurveyResult(queryClient, id);
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
            <div className={styles.subscribeShopWrapper}>
              <RecipeSelection id={id} />
              <PlanSelection />
              <PackInfo />
            </div>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
      <BottomNavBar />
    </div>
  );
}
