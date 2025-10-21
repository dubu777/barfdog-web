import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Spinner from "@/components/common/spinner/Spinner";
import PetEditForm from "@/components/pages/pet/edit/PetEditForm";
import { prefetchGetPetDetail } from "@/api/pet/queries/prefetchGetPetDetail";

interface PetEditPageProps {
  params: {
    petId: string;
  };
}

export default async function PetEditPage({ params }: PetEditPageProps) {
  const queryClient = new QueryClient();
  await prefetchGetPetDetail(queryClient, Number(params.petId));
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>반려견 상세 로딩 실패</div>}>
          <Suspense fallback={<Spinner fullscreen />}>
            <PetEditForm petId={Number(params.petId)} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
