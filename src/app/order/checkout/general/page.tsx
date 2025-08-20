import * as styles from "../../Order.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GeneralOrderContainer from "@/components/pages/checkout/general/GeneralOrderContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchGetAddressList } from "@/api/address/queries/usePrefetchGetAddressList";
import { prefetchGetCouponList } from "@/api/mypage/queries/usePrefetchGetCouponList";
import dynamic from "next/dynamic";
import Loader from "@/components/common/loader/Loader";

const GeneralOrderCSR = dynamic(
  () => import("@/components/pages/checkout/general/GeneralOrderContainer"),
  {
    ssr: false, // 서버 렌더링 완전 비활성화
    loading: () => <Loader fullscreen />, // 클라이언트 로딩 UI
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
