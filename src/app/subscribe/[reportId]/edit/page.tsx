import { prefetchGetSubscriptionDetailV2 } from "@/api/subscription/queries/usePrefetchGetSubscriptionDetailV2";
import Spinner from "@/components/common/spinner/Spinner";
import SubscriptionEdit from "@/components/pages/subscribe/subscriptionEdit/SubscriptionEdit";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Params = { reportId: string };

export default async function SubscriptionEditPage({
  params,
}: {
  params: Params;
}) {
  const reportId = Number(params.reportId);
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetailV2(queryClient, reportId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionEdit reportId={reportId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
