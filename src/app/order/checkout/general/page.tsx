import * as styles from "../../Order.css";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchGetAddressList } from "@/api/address/queries/usePrefetchGetAddressList";
import { prefetchGetCouponList } from "@/api/mypage/coupon/queries/prefetchGetCouponList";
import dynamic from "next/dynamic";
import Spinner from "@/components/common/spinner/Spinner";

const GeneralOrderCSR = dynamic(
  () => import("@/components/pages/checkout/general/GeneralOrderContainer"),
  {
    ssr: false,
    loading: () => <Spinner fullscreen />,
  }
);

export default async function GeneralPage() {
  const queryClient = new QueryClient();

  await prefetchGetAddressList(queryClient);
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <main className={styles.orderPageContainer}>
      <HydrationBoundary state={dehydrateState}>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <GeneralOrderCSR />
        </ErrorBoundary>
      </HydrationBoundary>
    </main>
  );
}
