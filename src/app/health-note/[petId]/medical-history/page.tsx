import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@/components/common/spinner/Spinner";
import HistoryList from "@/components/pages/heathNote/medicalHistory/list/HistoryList";
import { prefetchGetMedicalHistoryList } from "@/api/healthNote/medicalHistory/queries/prefetchGetMedicalHistoryList";

interface MedicalHistoryListPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function MedicalHistoryListPage({ params }: MedicalHistoryListPageProps) {
  const { petId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetMedicalHistoryList(Number(petId), queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>병원 진료 기록 목록 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <HistoryList petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}