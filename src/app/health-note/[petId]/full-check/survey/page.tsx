import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import FullCheckSurvey from "@/components/pages/heathNote/fullCheck/survey/FullCheckSurvey";
import Error from "@/components/layout/error/Error";
import { prefetchGetPetDetail } from "@/api/pet/queries/prefetchGetPetDetail";

interface FullCheckSurveyPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function FullCheckSurveyPage({
  params,
}: FullCheckSurveyPageProps) {
  const { petId } = await params;

  const queryClient = new QueryClient();
  await prefetchGetPetDetail(queryClient, Number(petId));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <FullCheckSurvey petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
