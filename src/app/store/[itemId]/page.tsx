import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ItemDetail from "@/components/pages/store/detail/ItemDetail";
import Error from "@/components/layout/error/Error";
import Spinner from "@/components/ui/spinner/Spinner";
import { prefetchGetStoreItemDetail } from "@/api/store/queries/prefetchGetStoreItemDetail";

interface StoreItemDetailPageProps {
  params: { itemId: string };
}

export default async function StoreItemDetailPage({ params }: StoreItemDetailPageProps) {
  const itemId = Number(params.itemId);

  const queryClient = new QueryClient();
  await prefetchGetStoreItemDetail(queryClient, itemId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ItemDetail itemId={itemId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
