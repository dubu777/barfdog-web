import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "@/components/ui/spinner/Spinner";
import { prefetchGetSubscriptionCheckoutSheet } from "@/api/checkout/queries/prefetchGetSubscriptionCheckoutSheet";
import { prefetchGetInfiniteCouponList } from "@/api/coupon/queries/prefetchGetInfiniteCouponList";
import SubscriptionCheckout from "@/components/pages/checkout/subscription/SubscriptionCheckout";
import Header from "@/components/layout/header/Header";

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
  await prefetchGetSubscriptionCheckoutSheet(queryClient, subscribeId);
  await prefetchGetInfiniteCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      {/* 재시도 버튼 개발 예정 */}
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<Spinner fullscreen />}>
          <Header centerTitle="결제" showBackButton />
          <SubscriptionCheckout subscribeId={subscribeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
