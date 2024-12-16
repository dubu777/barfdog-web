import {
  prefetchGetOrderSheet,
} from "@/api/order/queries/useGetOrderSheet";
import * as styles from "../../../Order.css";
import OrderInfo from "@/components/pages/order/orderContainer/orderInfo/OrderInfo";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import OrderContainer from "@/components/pages/order/orderContainer/OrderContainer";

interface SubscriptionPageProps {
  params: { subscribeId: number };
}

export default async function SubscriptionPage({
  params,
}: SubscriptionPageProps) {
  const { subscribeId } = params;
  const queryClient = new QueryClient();

  await prefetchGetOrderSheet(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <OrderContainer subscribeId={subscribeId}/>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
