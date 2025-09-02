import Spinner from "@/components/common/spinner/Spinner";
import ProbiomeList from "@/components/pages/heathNote/probiome/list/ProbiomeList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
    <ErrorBoundary fallback={<div>에러가 발생했습니다</div>}>
      <Suspense fallback={<Spinner fullscreen />}>
        <ProbiomeList petId={parsedDogId} />
      </Suspense>
    </ErrorBoundary>
  );
}
