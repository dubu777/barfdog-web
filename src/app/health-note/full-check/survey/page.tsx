import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Loader from "@/components/common/loader/Loader";
import FullCheckSurvey from "@/components/pages/heathNote/fullCheck/survey/FullCheckSurvey";
import { prefetchGetPetDetail } from "@/api/pet/queries/usePrefetchGetPetDetail";

interface FullCheckSurveyPageProps {
  searchParams: Promise<{
    petId: string;
  }>;
}

export default async function FullCheckSurveyPage({ searchParams }: FullCheckSurveyPageProps) {
  const { petId } = await searchParams;

  const queryClient = new QueryClient();
  await prefetchGetPetDetail(queryClient, Number(petId));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>건강 종합 진단 설문 로딩 실패</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <FullCheckSurvey petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
