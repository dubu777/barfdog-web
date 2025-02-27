import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetOrderDetail } from "@/api/order/queries/useGetOrderDetail";
import { OrderDetailType } from "@/types";
import OrderDetail from "@/components/pages/mypage/orderHistory/[orderId]/orderDetail/OrderDetail";

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
  searchParams: {
    type: OrderDetailType;
  }
}

export default async function OrderDetailPage({ params, searchParams }: OrderDetailPageProps) {
  const { orderId } = params;
  const { type } = searchParams;

  const queryClient = new QueryClient();
  await prefetchGetOrderDetail(queryClient, orderId, type);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>주문 데이터가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderDetail type={type} orderId={orderId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
