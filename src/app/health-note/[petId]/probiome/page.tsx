import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "@/components/ui/spinner/Spinner";
import ProbiomeList from "@/components/pages/heathNote/probiome/list/ProbiomeList";
import Error from "@/components/layout/error/Error";

interface ProbiomeListPageProps {
  params: {
    petId: string;
  };
}

export default async function ProbiomeListPage({
  params,
}: ProbiomeListPageProps) {
  const { petId } = params;
  const parsedDogId = parseInt(petId);

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Spinner fullscreen />}>
        <ProbiomeList petId={parsedDogId} />
      </Suspense>
    </ErrorBoundary>
  );
}
