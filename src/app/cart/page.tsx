import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Cart from "@/components/pages/cart/Cart";
import Error from "@/components/layout/error/Error";
import { prefetchGetCartInfo } from "@/api/cart/queries/prefetchGetCartInfo";

export default async function CartPage() {
  const queryClient = new QueryClient();
  await prefetchGetCartInfo(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Cart />
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
