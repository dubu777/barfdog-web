import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { prefetchGetDogs } from "@/api/dog/queries/useGetDogs";
import MyPageMain from "@/components/pages/mypage/main/MyPageMain";
import {prefetchGetMyPageBanner} from "@/api/mypage/queries/useGetMypageBanner";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await prefetchGetMyPageInfo(queryClient);
  await prefetchGetMyPageBanner(queryClient);
  await prefetchGetDogs(queryClient);

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <MyPageMain />
    </HydrationBoundary>
  )
}
