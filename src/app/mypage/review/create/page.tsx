import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import CreateDetail from "@/components/pages/mypage/review/createDetail/CreateDetail";

export default async function ReviewCreatePage() {
  const queryClient = new QueryClient();
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>리뷰를 작성할 수 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <CreateDetail />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
