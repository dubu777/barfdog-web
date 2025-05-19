import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { prefetchGetMyPageBanner } from "@/api/mypage/queries/useGetMypageBanner";
import { prefetchGetSubscriptionList } from "@/api/subscription/queries/useGetSubscriptionList";
import MyPageMain from "@/components/pages/mypage/main/MyPageMain";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { prefetchGetDogList } from "@/api/dog/queries/usePrefetchGetDogList";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await prefetchGetMyPageInfo(queryClient);
  await prefetchGetMyPageBanner(queryClient);
  await prefetchGetSubscriptionList(queryClient, 0);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <MyPageMain />
      <BottomNavBar />
    </HydrationBoundary>
  )
}
