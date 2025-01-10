import StoreList from "@/components/pages/store/storeList/StoreList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";

export default async function StorePage() {
  const queryClient = new QueryClient();
  await prefetchGetStoreItemList(queryClient, 0, 'recent', 'ALL');
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <StoreList />
    </HydrationBoundary>
  )
}
