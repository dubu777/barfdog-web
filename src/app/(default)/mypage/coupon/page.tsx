import { Suspense } from "react";
import Coupon from "@/components/pages/mypage/coupon/Coupon";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetCouponList } from "@/api/mypage/queries/useGetCoupons";

export default async function CouponPage() {
  const queryClient = new QueryClient();
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>사용 가능한 쿠폰이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Coupon />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
