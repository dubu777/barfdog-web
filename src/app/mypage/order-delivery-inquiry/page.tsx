import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetMergeOrderList } from "@/api/order/queries/usePrefetchGetMergeOrderList";
import OrderDeliveryInquiry from "@/components/pages/mypage/orderDeliveryInquiry/OrderDeliveryInquiry";
import Loader from "@/components/common/loader/Loader";

export default async function OrderDeliveryInquiryPage() {
  const queryClient = new QueryClient();
  await prefetchGetMergeOrderList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>주문 및 배송조회 데이터가 없습니다.</div>}>
        <Suspense fallback={<Loader fullscreen />}>
          <OrderDeliveryInquiry />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
