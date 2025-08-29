import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetOrderDetail } from "@/api/order/queries/usePrefetchGetOrderDetail";
import { prefetchGetAddressList } from "@/api/address/queries/usePrefetchGetAddressList";
import { OrderType } from "@/types";
import OrderDetail
  from "@/components/pages/mypage/orderDeliveryInquiry/orderDetail/OrderDetail";
import Spinner from "@/components/common/spinner/Spinner";

interface OrderDetailPageProps {
  params: {
    orderId: number;
  };
  searchParams: {
    orderType: OrderType;
  }
}

export default async function OrderDetailPage({ params, searchParams }: OrderDetailPageProps) {
  const orderId = Number(params.orderId);
  const { orderType } = searchParams;

  const queryClient = new QueryClient();
  await prefetchGetOrderDetail(queryClient, orderId, orderType);
  await prefetchGetAddressList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>주문 데이터가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <OrderDetail orderId={orderId} orderType={orderType}/>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
