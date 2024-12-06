import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetPackageBenefits } from "@/api/subscription/queries/useGetPackageBenefits";
import PackageBenefit from "@/components/pages/mypage/packageBenefit/PackageBenefit";

interface PackageBenefitPageParams {
  params: {
    subscribeId: string;
  }
}

export default async function PackageBenefitPage({ params }: PackageBenefitPageParams) {
  const { subscribeId } = params;
  const queryClient = new QueryClient();
  await prefetchGetPackageBenefits(queryClient, subscribeId);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>페키지 혜택 데이터가 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <PackageBenefit subscribeId={subscribeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}