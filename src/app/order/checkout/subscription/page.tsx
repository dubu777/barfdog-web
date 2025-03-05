
import * as styles from "../../Order.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import SubscriptionOrderContainer from "@/components/pages/order/subscription/subscriptionOrderContainer/SubscriptionOrderContainer";
import { prefetchGetSubscriptionOrder } from "@/api/order/queries/useGetSubscriptionOrder";

interface SubscriptionPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SubscriptionPage({
  searchParams,
}: SubscriptionPageProps) {
  const subscribeId = Number(searchParams.subscribeId);
  
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionOrder(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <SubscriptionOrderContainer subscribeId={subscribeId}/>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
