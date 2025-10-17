import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import MainWrapper from "@/components/pages/main/layout/MainWrapper";
import Popup from "@/components/layout/popup/Popup";
import { prefetchGetBestReviewList } from "@/api/review/queries/prefetchGetBestReviewList";
import { prefetchGetStoreItemList } from "@/api/store/queries/prefetchGetStoreItemList";
import { prefetchGetMainBannerInfo } from "@/api/main/queries/prefetchGetMainBannerInfo";

export default async function MainPage() {
  const queryClient = new QueryClient();
  await prefetchGetMainBannerInfo(queryClient);
  await prefetchGetBestReviewList(queryClient);
  await prefetchGetStoreItemList(queryClient);

  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <MainWrapper />
      <Popup />
    </HydrationBoundary>
  )
}
