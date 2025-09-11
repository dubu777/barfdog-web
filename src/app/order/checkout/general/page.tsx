import * as styles from "../../Order.css";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchGetCouponList } from "@/api/mypage/coupon/queries/prefetchGetCouponList";
import GeneralOrderContainer from "@/components/pages/checkout/general/GeneralOrderContainer";

export default async function GeneralPage() {
  const queryClient = new QueryClient();

  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <main className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <GeneralOrderContainer />
        </ErrorBoundary>
      </HydrationBoundary>
    </main>
  );
}
