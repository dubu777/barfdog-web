import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GeneralCheckout from "@/components/pages/checkout/general/GeneralCheckout";
import Header from "@/components/layout/header/Header";
import Error from "@/components/layout/error/Error";
import { prefetchGetInfiniteCouponList } from "@/api/coupon/queries/prefetchGetInfiniteCouponList";

export default async function GeneralPage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteCouponList(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Header centerTitle="결제" showBackButton />
        <GeneralCheckout />
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
