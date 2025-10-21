import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@/components/common/spinner/Spinner";
import FullCheckSurvey from "@/components/pages/heathNote/fullCheck/survey/FullCheckSurvey";
import { prefetchGetPetDetail } from "@/api/pet/queries/prefetchGetPetDetail";

interface FullCheckSurveyPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function FullCheckSurveyPage({ params }: FullCheckSurveyPageProps) {
  const { petId } = await params;

  const queryClient = new QueryClient();
  await prefetchGetPetDetail(queryClient, Number(petId));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>건강 종합 진단 설문 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <FullCheckSurvey petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
