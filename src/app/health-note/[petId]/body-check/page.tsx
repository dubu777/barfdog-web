import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BodyCheckList from "@/components/pages/heathNote/bodyCheck/list/BodyCheckList";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
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
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <BodyCheckList petId={Number(petId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
