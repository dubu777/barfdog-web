import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import FullCheckList from "@/components/pages/heathNote/fullCheck/list/FullCheckList";
import { prefetchGetInfiniteFullCheckList } from "@/api/healthNote/fullCheck/queries/prefetchGetInfiniteFullCheckList";

interface FullCheckListPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function FullCheckListPage({ params }: FullCheckListPageProps) {
  const { petId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetInfiniteFullCheckList(Number(petId), queryClient);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>건강 종합 진단 목록 로딩 실패</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <FullCheckList petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
