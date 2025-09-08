import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "@/components/common/spinner/Spinner";
import FullCheckResult from "@/components/pages/heathNote/fullCheck/result/FullCheckResult";
import { prefetchGetFullCheckResultDetail } from "@/api/healthNote/fullCheck/queries/prefetchGetFullCheckResultDetail";
import { prefetchGetPetDetail } from "@/api/pet/queries/usePrefetchGetPetDetail";

interface FullCheckResultPageProps {
  params: Promise<{
    petId: string;
    diagnosisId: string;
  }>
}

export default async function FullCheckResultPage({ params }: FullCheckResultPageProps) {
  const { petId, diagnosisId } = await params;

  const queryClient = new QueryClient();
  await prefetchGetFullCheckResultDetail(Number(diagnosisId), queryClient);
  await prefetchGetPetDetail(queryClient, Number(petId));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>건강 종합 진단 상세 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <FullCheckResult diagnosisId={Number(diagnosisId)} petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
