import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { prefetchGetDogList } from "@/api/dog/queries/useGetDogList";
import { prefetchGetMyPageBanner } from "@/api/mypage/queries/useGetMypageBanner";
import { prefetchGetPaymentList } from "@/api/mypage/queries/useGetPaymentList";
import MyPageMain from "@/components/pages/mypage/main/MyPageMain";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await prefetchGetMyPageInfo(queryClient);
  await prefetchGetMyPageBanner(queryClient);
  await prefetchGetDogList(queryClient);
  await prefetchGetPaymentList(queryClient);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <MyPageMain />
      <BottomNavBar />
    </HydrationBoundary>
  )
}
