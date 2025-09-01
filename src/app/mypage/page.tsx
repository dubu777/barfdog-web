import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetMyPageInfo } from "@/api/mypage/common/queries/prefetchGetMyPageInfo";
import { prefetchGetMyPageBanner } from "@/api/mypage/common/queries/prefetchGetMyPageBanner";
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
