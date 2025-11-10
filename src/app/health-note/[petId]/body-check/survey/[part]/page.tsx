import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import BodyCheckSurvey from "@/components/pages/heathNote/bodyCheck/survey/BodyCheckSurvey";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { BodyPartType } from "@/types/healthNote/bodyCheck";

interface BodyCheckSurveyPageProps {
  params: Promise<{
    petId: string;
    part: BodyPartType;
  }>;
}

export default async function BodyCheckSurveyPage({ params }: BodyCheckSurveyPageProps) {
  const { petId, part } = await params;

  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <BodyCheckSurvey part={part as BodyPartType} petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
