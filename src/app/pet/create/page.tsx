import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PetCreateForm from "@/components/pages/pet/create/PetCreateForm";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetPetBreedList } from "@/api/pet/queries/prefetchGetPetBreedList";

interface PetCreatePageProps {
  searchParams: {
    source: "diet-analysis" | "health-note";
  };
}

export default async function PetCreatePage({
  searchParams,
}: PetCreatePageProps) {
  const queryClient = new QueryClient();
  await prefetchGetPetBreedList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  const source = searchParams?.source ?? "diet-analysis";
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <PetCreateForm source={source} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
