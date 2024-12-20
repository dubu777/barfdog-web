
import * as styles from "../../../Order.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import OrderContainer from "@/components/pages/order/orderContainer/OrderContainer";
import { prefetchGetSubscriptionOrderSheet } from "@/api/order/queries/useGetSubscriptionOrderSheet";

interface SubscriptionPageProps {
  params: { subscribeId: string };
}

export default async function SubscriptionPage({
  params,
}: SubscriptionPageProps) {
  const { subscribeId } = params;
  const numericSubscribeId = Number(subscribeId);
  
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionOrderSheet(queryClient, numericSubscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <OrderContainer subscribeId={numericSubscribeId}/>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
