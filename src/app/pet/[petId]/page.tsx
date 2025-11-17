import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner/Spinner";
import PetEditForm from "@/components/pages/pet/edit/PetEditForm";
import Error from "@/components/layout/error/Error";
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
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Spinner fullscreen />}>
            <PetEditForm petId={Number(params.petId)} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
