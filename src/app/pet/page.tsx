import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import PetManager from "@/components/pages/pet/list/PetManager";
import { prefetchGetPetList } from "@/api/pet/queries/prefetchGetPetList";

export default async function HeathNoteDogsPage() {
  const queryClient = new QueryClient();
  await prefetchGetPetList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>반려견 전체보기 로딩 실패</div>}>
          <Suspense fallback={<Spinner fullscreen />}>
            <PetManager />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
