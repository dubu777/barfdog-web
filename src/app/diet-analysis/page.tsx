import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import Spinner from "@/components/ui/spinner/Spinner";
import DietAnalysisMain from "@/components/pages/dietAnalysis/main/DietAnalysisMain";
import { prefetchGetPetList } from "@/api/pet/queries/prefetchGetPetList";

export default async function DietAnalysisPage() {
  const queryClient = new QueryClient();

  await prefetchGetPetList(queryClient);

  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>추천식단 에러</div>}>
        <Suspense fallback={<Spinner />}>
          <Header leftTitle="AI 추천식단" showCartButton />
          <DietAnalysisMain />
          <BottomNavBar />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
