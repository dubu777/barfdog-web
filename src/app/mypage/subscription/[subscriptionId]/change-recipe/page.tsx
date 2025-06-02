import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/usePrefetchSubscriptionAndDogDetail";
import ChangeRecipe from "@/components/pages/mypage/subscription/changeRecipe/ChangeRecipe";

interface ChangeRecipePageParams {
  params: {
    subscriptionId: number;
  }
}

export default async function ChangeRecipePage({ params }: ChangeRecipePageParams) {
  const subscriptionId = Number(params.subscriptionId);
  const queryClient = new QueryClient();
  await prefetchGetSubscriptionDetail(queryClient, subscriptionId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페이지 접근이 불가합니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangeRecipe subscriptionId={subscriptionId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
