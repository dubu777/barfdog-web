import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import OrderDetail from "@/components/pages/mypage/orders/detail/OrderDetail";
import Spinner from "@/components/common/spinner/Spinner";
import { OrderType } from "@/types/mypage/orders";
import { prefetchGetOrderDetail } from "@/api/mypage/orders/queries/prefetchGetOrderDetail";

interface OrderDetailPageProps {
  params: Promise<{
    orderId: number;
    orderType: string;
  }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { orderId, orderType } = await params;

  const queryClient = new QueryClient();
  await prefetchGetOrderDetail(queryClient, Number(orderId), orderType.toUpperCase() as OrderType);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>주문 데이터가 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <OrderDetail orderId={Number(orderId)} orderType={orderType.toUpperCase() as OrderType} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
