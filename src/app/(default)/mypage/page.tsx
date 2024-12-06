import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetMypageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { prefetchGetDogs } from "@/api/dog/queries/useGetDogs";
import MyPageMain from "@/components/pages/mypage/main/MyPageMain";

export default async function MypagePage() {
  const queryClient = new QueryClient();

  await prefetchGetMypageInfo(queryClient);
  await prefetchGetDogs(queryClient);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>마이페이지 로딩 실패</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <MyPageMain />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
