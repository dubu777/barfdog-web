import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetCartData } from "@/api/cart/queries/useGetCart";
import Cart from "@/components/pages/cart/Cart";

export default async function CartPage() {
  const queryClient = new QueryClient();
  await prefetchGetCartData(queryClient);
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
