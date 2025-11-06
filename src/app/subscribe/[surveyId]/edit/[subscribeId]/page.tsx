import { prefetchSubscriptionInfo } from "@/api/subscription/queries/prefetchSubscriptionInfo";
import { prefetchSubscriptionOrderSheet } from "@/api/subscription/queries/prefetchSubscriptionOrderSheet";
import Spinner from "@/components/ui/spinner/Spinner";
import SubscriptionEdit from "@/components/pages/subscribe/subscriptionEdit/SubscriptionEdit";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Params = { subscribeId: string; surveyId: string };

export default async function SubscriptionEditPage({
  params,
}: {
  params: Params;
}) {
  const subscribeId = Number(params.subscribeId);
  const surveyId = Number(params.surveyId);
  const queryClient = new QueryClient();
  await prefetchSubscriptionOrderSheet(queryClient, surveyId);
  await prefetchSubscriptionInfo(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionEdit subscribeId={subscribeId} surveyId={surveyId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
