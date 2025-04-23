import * as styles from "../../Order.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GeneralOrderContainer from "@/components/pages/order/general/GeneralOrderContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchGetAddressList } from "@/api/address/queries/usePrefetchGetAddressList";
import { prefetchGetCouponList } from "@/api/mypage/queries/usePrefetchGetCouponList";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";

interface GeneralPageProps {}

export default async function GeneralPage({}: GeneralPageProps) {
  const queryClient = new QueryClient();

  await prefetchGetAddressList(queryClient);
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <main className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
          <NavigationGuard>
            <GeneralOrderContainer />
          </NavigationGuard>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </main>
  );
}
