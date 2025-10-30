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

type Params = { surveyId: string };

export default async function SubscribePage({ params }: { params: Params }) {
  const surveyId = Number(params.surveyId);
  const queryClient = new QueryClient();
  await prefetchGetRawFoodOrderSheet(queryClient, surveyId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionOrderSheet surveyId={surveyId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
