import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import StoreList from "@/components/pages/store/list/StoreList";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetInfiniteStoreItemList } from "@/api/store/queries/prefetchGetInfiniteStoreItemList";

import Header from "@/components/layout/header/Header";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Wrapper from "@/components/layout/wrapper/Wrapper";

export default async function StorePage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteStoreItemList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <Header showCartButton leftTitle="스토어" />
          <Wrapper>
            <StoreList />
          </Wrapper>
          <BottomNavBar />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
