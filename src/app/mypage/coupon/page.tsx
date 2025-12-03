import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import CouponList from "@/components/pages/mypage/coupon/list/CouponList";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetInfiniteCouponList } from "@/api/coupon/queries/prefetchGetInfiniteCouponList";

export default async function CouponPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <CouponList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
