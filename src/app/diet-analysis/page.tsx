import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import DietAnalysisPageContainer from "@/components/pages/dietAnalysis/DietAnalysisPageContainer";
import { prefetchGetDogList } from "@/api/dog/queries/usePrefetchGetDogList";

export default async function DietAnalysisPage() {
  const queryClient = new QueryClient();

  await prefetchGetDogList(queryClient);

  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>MyPage info 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage info Loading...</div>}>
          <Header leftTitle="AI 추천식단" showCartButton />
          <DietAnalysisPageContainer />
          <BottomNavBar />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
