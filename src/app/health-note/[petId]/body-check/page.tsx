import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import BodyCheckList from "@/components/pages/heathNote/bodyCheck/list/BodyCheckList";
import Loader from "@/components/common/loader/Loader";
import { prefetchGetLatestBodyCheck } from "@/api/healthNote/bodyCheck/queries/prefetchGetLatestBodyCheck";
import { prefetchGetInfiniteBodyCheckList } from "@/api/healthNote/bodyCheck/queries/prefetchGetInfiniteBodyCheckList";

interface BodyCheckPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function BodyCheckPage({ params }: BodyCheckPageProps) {
  const { petId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetLatestBodyCheck(Number(petId), queryClient);
  await prefetchGetInfiniteBodyCheckList(Number(petId), queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>부위별 진단 목록 로딩 실패</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <BodyCheckList petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}