import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import { prefetchGetMainInfo } from "@/api/main/queries/useGetMainInfo";
import { prefetchGetMainDeadlineBanner } from "@/api/main/queries/useGetMainBanner";
import MainWrapper from "@/components/pages/main/layout/MainWrapper";
import Popup from "@/components/layout/popup/Popup";

export default async function MainPage() {
  const queryClient = new QueryClient();
  await prefetchGetMainInfo(queryClient);
  await prefetchGetMainDeadlineBanner(queryClient);

  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <MainWrapper />
      <Popup />
    </HydrationBoundary>
  )
}
