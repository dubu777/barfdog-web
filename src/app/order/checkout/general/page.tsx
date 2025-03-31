import * as styles from "../../Order.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GeneralOrderContainer from "@/components/pages/order/general/GeneralOrderContainer";
import { prefetchGetSAddressList } from "@/api/address/queries/useGetAddressList";
import { prefetchGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface GeneralPageProps {}

export default async function GeneralPage({}: GeneralPageProps) {
  const queryClient = new QueryClient();
  await prefetchGetSAddressList(queryClient);
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          {/* 로딩 컴포넌트 개발 예정 */}
          <Suspense fallback={<div>Loading...</div>}>
            <GeneralOrderContainer />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
