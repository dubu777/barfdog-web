import { prefetchGetRawFoodOrderSheet } from "@/api/subscription/queries/prefetchRawFoodOrderSheet";
import Spinner from "@/components/common/spinner/Spinner";
import SubscriptionOrderSheet from "@/components/pages/subscribe/SubscriptionOrderSheet";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Params = { reportId: string };

export default async function SubscribePage({ params }: { params: Params }) {
  const reportId = Number(params.reportId);
  const queryClient = new QueryClient();
  await prefetchGetRawFoodOrderSheet(queryClient, reportId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionOrderSheet reportId={reportId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
