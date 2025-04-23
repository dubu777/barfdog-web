import * as styles from "../../Order.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SubscriptionOrderContainer from "@/components/pages/order/subscription/subscriptionOrderContainer/SubscriptionOrderContainer";
import { prefetchGetAddressList } from "@/api/address/queries/usePrefetchGetAddressList";
import { prefetchGetCouponList } from "@/api/mypage/queries/usePrefetchGetCouponList";
import { prefetchGetSubscriptionOrder } from "@/api/order/queries/usePrefetchGetSubscriptionOrder";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";

interface SubscriptionPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SubscriptionPage({
  searchParams,
}: SubscriptionPageProps) {
  const subscribeId = Number(searchParams.subscribeId);

  const queryClient = new QueryClient();
  await prefetchGetSubscriptionOrder(queryClient, subscribeId);
  await prefetchGetAddressList(queryClient);
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <NavigationGuard>
              <SubscriptionOrderContainer subscribeId={subscribeId} />
            </NavigationGuard>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
