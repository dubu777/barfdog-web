import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetStoreItemDetail } from "@/api/store/queries/prefetchGetStoreItemDetail";
import ItemDetail from "@/components/pages/store/detail/ItemDetail";

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
      <ErrorBoundary fallback={<div>상세 상품이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemDetail itemId={itemId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
