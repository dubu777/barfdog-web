import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Loader from "@/components/common/loader/Loader";
import HistoryList from "@/components/pages/heathNote/medicalHistory/list/HistoryList";
import { prefetchGetMedicalHistoryList } from "@/api/healthNote/medicalHistory/queries/prefetchGetMedicalHistoryList";

interface MedicalHistoryListPageProps {
  searchParams: Promise<{
    petId: string;
  }>;
}

export default async function MedicalHistoryListPage({ searchParams }: MedicalHistoryListPageProps) {
  const { petId } = await searchParams;
  const queryClient = new QueryClient();
  await prefetchGetMedicalHistoryList(Number(petId), queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>병원 진료 기록 목록 로딩 실패</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <HistoryList petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}