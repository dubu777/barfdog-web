import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import BodyCheckResult from "@/components/pages/heathNote/bodyCheck/result/BodyCheckResult";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { prefetchGetPetDetail } from "@/api/pet/queries/prefetchGetPetDetail";
import { prefetchGetBodyCheckResultDetail } from "@/api/healthNote/bodyCheck/queries/prefetchGetBodyCheckResultDetail";

interface BodyCheckResultPageProps {
  params: Promise<{
    petId: string;
    diagnosisId: string;
    part: string;
  }>
}

export default async function BodyCheckResultPage({ params }: BodyCheckResultPageProps) {
  const { petId, part, diagnosisId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetBodyCheckResultDetail(part as BodyPartType, Number(diagnosisId), queryClient);
  await prefetchGetPetDetail(queryClient, Number(petId));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <BodyCheckResult part={part as BodyPartType} petId={Number(petId)} diagnosisId={Number(diagnosisId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
