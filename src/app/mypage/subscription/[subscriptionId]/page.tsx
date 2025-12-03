import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import SubscriptionDetail from "@/components/pages/mypage/subscription/detail/SubscriptionDetail";
import Error from "@/components/layout/error/Error";
import { prefetchGetSubscriptionDetail } from "@/api/mypage/subscription/queries/prefetchGetSubscriptionDetail";

interface SubscriptionDetailPageProps {
  params: {
    subscriptionId: string;
  };
}

export default async function SubscriptionDetailPage({
  params,
}: SubscriptionDetailPageProps) {
  const { subscriptionId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, Number(subscriptionId));
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <SubscriptionDetail subscriptionId={Number(subscriptionId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
