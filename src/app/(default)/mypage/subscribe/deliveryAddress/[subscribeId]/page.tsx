import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetDeliveryAddress } from "@/api/subscription/queries/useGetDeliveryAddress";
import DeliveryAddress from "@/components/pages/mypage/deliveryAddress/DeliveryAddress";

interface ManageShippingAddressPageProps {
  params: { subscribeId: string };
  searchParams: { changeType?: string };
}

export default async function ManageShippingAddressPage({ params, searchParams }: ManageShippingAddressPageProps) {
  const changeType = searchParams.changeType || undefined;
  const { subscribeId } = params;

  const queryClient = new QueryClient();
  await prefetchGetDeliveryAddress(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>구독 배송지가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <DeliveryAddress
            changeType={changeType}
            subscribeId={subscribeId}
          />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>

  )
}
