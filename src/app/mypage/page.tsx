import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { prefetchGetDogList } from "@/api/dog/queries/useGetDogList";
import { prefetchGetMyPageBanner } from "@/api/mypage/queries/useGetMypageBanner";
import { prefetchGetSubscriptionList } from "@/api/subscription/queries/useGetSubscriptionList";
import MyPageMain from "@/components/pages/mypage/main/MyPageMain";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await prefetchGetMyPageInfo(queryClient);
  await prefetchGetMyPageBanner(queryClient);
  await prefetchGetDogList(queryClient);
  await prefetchGetSubscriptionList(queryClient, 0);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>MyPage info 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage info Loading...</div>}>
          <MyPageMain />
          <BottomNavBar />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
