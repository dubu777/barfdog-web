import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HealthNoteMain from "@/components/pages/heathNote/main/HealthNoteMain";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Loader from "@/components/common/loader/Loader";
import { prefetchGetFullDogList } from "@/api/dog/queries/usePrefetchGetFullDogList";

export default async function HeathNotePage() {
  const queryClient = new QueryClient();
  await prefetchGetFullDogList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>반려견 정보 로딩 실패</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <HealthNoteMain />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
    <BottomNavBar />
    </>
  );
}
