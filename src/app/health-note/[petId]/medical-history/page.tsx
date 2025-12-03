import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import HistoryList from "@/components/pages/heathNote/medicalHistory/list/HistoryList";
import Error from "@/components/layout/error/Error";
import { prefetchGetMedicalHistoryList } from "@/api/healthNote/medicalHistory/queries/prefetchGetMedicalHistoryList";

interface MedicalHistoryListPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function MedicalHistoryListPage({
  params,
}: MedicalHistoryListPageProps) {
  const { petId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetMedicalHistoryList(Number(petId), queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <HistoryList petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
