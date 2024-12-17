import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetCartInfo } from "@/api/cart/queries/useGetCartInfo";
import Cart from "@/components/pages/cart/Cart";

export default async function CartPage() {
  const queryClient = new QueryClient();
  await prefetchGetCartInfo(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상품이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Cart />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
