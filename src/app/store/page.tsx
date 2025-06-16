import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { prefetchGetStoreItemList } from "@/api/store/queries/usePrefetchGetStoreItemList";
import Loader from "@/components/common/loader/Loader";
import StoreList from "@/components/pages/store/storeList/StoreList";

export default async function StorePage() {
  const queryClient = new QueryClient();
  await prefetchGetStoreItemList(queryClient, 0, 'recent', 'ALL');
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상품이 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen /> }>
          <StoreList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}