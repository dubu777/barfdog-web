import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchSubscriptionAndDogDetail } from "@/api/subscription/queries/usePrefetchSubscriptionAndDogDetail";
import { prefetchGetPaymentList } from "@/api/mypage/queries/usePrefetchGetPaymentList";
import { prefetchGetAddressList } from "@/api/address/queries/usePrefetchGetAddressList";
import { prefetchGetCouponList } from "@/api/mypage/queries/usePrefetchGetCouponList";
import SubscriptionDetail from "@/components/pages/mypage/subscription/subscriptionDetail/SubscriptionDetail";
import Spinner from "@/components/common/spinner/Spinner";

interface SubscriptionDetailPageProps {
  params: {
    subscriptionId: string;
  }
}

export default async function SubscriptionDetailPage({ params }: SubscriptionDetailPageProps) {
  const subscriptionId = Number(params.subscriptionId);
  const queryClient = new QueryClient();
  await prefetchSubscriptionAndDogDetail(queryClient, subscriptionId);
  await prefetchGetPaymentList(queryClient);
  await prefetchGetAddressList(queryClient);
  await prefetchGetCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionDetail subscriptionId={subscriptionId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}