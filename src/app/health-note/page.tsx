import { Suspense } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { HydrationBoundary } from "@tanstack/react-query";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import HealthNoteUser from "@/components/pages/heathNote/main/healthNoteUser/healthNoteUser";
import HealthNoteMainHeader from "@/components/pages/heathNote/layout/header/HealthNoteMainHeader";
import Error from "@/components/layout/error/Error";
import Spinner from "@/components/ui/spinner/Spinner";
import { PetListResponse } from "@/types/pet";
import { queryKeys } from "@/constants/queryKeys";
import { prefetchGetPetList } from "@/api/pet/queries/prefetchGetPetList";
import { prefetchGetFullCheckSummary } from "@/api/healthNote/fullCheck/queries/prefetchGetFullCheckSummary";

export default async function HeathNotePage() {
  const queryClient = new QueryClient();
  await prefetchGetPetList(queryClient);

  // prefetch된 petList에서 대표 반려견 찾기
  const petList = queryClient.getQueryData<PetListResponse>([
    queryKeys.PET.BASE,
    queryKeys.PET.GET_PET_LIST,
  ]);

  const representativePet = petList?.find((pet) => pet.isRepresentative);

  // 대표 반려견이 있으면 fullCheckSummary도 prefetch
  if (representativePet?.id) {
    await prefetchGetFullCheckSummary(representativePet.id, queryClient);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <HealthNoteMainHeader />
          <HealthNoteUser />
          <BottomNavBar />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
