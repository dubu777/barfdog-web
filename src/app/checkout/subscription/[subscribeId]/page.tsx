import * as styles from "../../../order/Order.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetSubscriptionOrder } from "@/api/checkout/queries/usePrefetchGetSubscriptionOrder";
import { prefetchGetCouponList } from "@/api/mypage/coupon/queries/prefetchGetCouponList";
import SubscriptionOrderContainer from "@/components/pages/checkout/subscription/SubscriptionOrderContainer";
import Spinner from "@/components/common/spinner/Spinner";

interface SubscriptionPageProps {
  params: {
    subscribeId: string;
  };
}

export default async function SubscriptionPage({
  params,
}: SubscriptionPageProps) {
  const subscribeId = Number(params.subscribeId);

  const queryClient = new QueryClient();
  await prefetchGetSubscriptionOrder(queryClient, subscribeId);
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        {/* 재시도 버튼 개발 예정 */}
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<Spinner fullscreen />}>
            <SubscriptionOrderContainer subscribeId={subscribeId} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
