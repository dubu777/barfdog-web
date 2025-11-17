import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import StoreList from "@/components/pages/store/list/StoreList";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetInfiniteStoreItemList } from "@/api/store/queries/prefetchGetInfiniteStoreItemList";

export default async function StorePage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteStoreItemList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen /> }>
          <StoreList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}