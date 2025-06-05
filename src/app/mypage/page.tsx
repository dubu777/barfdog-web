import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetMyPageInfo } from "@/api/mypage/queries/usePrefetchGetMyPageInfo";
import { prefetchGetMyPageBanner } from "@/api/mypage/queries/usePrefetchGetMyPageBanner";
import { prefetchGetSubscriptionList } from "@/api/subscription/queries/usePrefetchGetSubscriptionList";
import MyPageMain from "@/components/pages/mypage/main/MyPageMain";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await prefetchGetMyPageInfo(queryClient);
  await prefetchGetMyPageBanner(queryClient);
  await prefetchGetSubscriptionList(queryClient, 0, 999);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <MyPageMain />
      <BottomNavBar />
    </HydrationBoundary>
  )
}
