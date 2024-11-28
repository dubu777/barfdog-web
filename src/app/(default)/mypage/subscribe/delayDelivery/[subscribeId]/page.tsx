import DelayDelivery from "@/components/pages/mypage/delayDelivery/DelayDelivery";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import {prefetchGetSubscribe} from "@/api/queries/useGetSubscribe";
import { SearchParamProps } from "@/types/common";

interface DelayDeliveryPageParams {
  params: {
    subscribeId: number;
  }
}

export default async function DelayDeliveryPage({ params }: DelayDeliveryPageParams) {

  const queryClient = new QueryClient();
  await prefetchGetSubscribe(queryClient, params.subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <DelayDelivery subscribeId={params.subscribeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
