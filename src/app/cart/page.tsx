import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetCartInfo } from "@/api/cart/queries/usePrefetchGetCartInfo";
import Cart from "@/components/pages/cart/Cart";

export default async function CartPage() {
  const queryClient = new QueryClient();
  await prefetchGetCartInfo(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상품이 없습니다.</div>}>
        <Cart />
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
