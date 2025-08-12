import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Loader from "@/components/common/loader/Loader";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import PetManager from "@/components/pages/heathNote/common/petManager/PetManager";
import { prefetchGetPetList } from "@/api/pet/queries/usePrefetchGetPetList";

export default async function HeathNoteDogsPage() {
  const queryClient = new QueryClient();
  await prefetchGetPetList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>반려견 전체보기 로딩 실패</div>}>
          <Suspense fallback={<Loader fullscreen />}>
            <PetManager />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
      <BottomNavBar />
    </>
  );
}
