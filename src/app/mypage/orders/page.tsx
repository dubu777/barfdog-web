import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import OrderList from "@/components/pages/mypage/orders/list/OrderList";
import Spinner from "@/components/ui/spinner/Spinner";
import { prefetchGetInfiniteOrderList } from "@/api/mypage/orders/queries/prefetchGetInfiniteOrderList";

export default async function OrderListPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteOrderList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>주문 및 배송조회 데이터가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
