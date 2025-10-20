import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import MainWrapper from "@/components/pages/main/layout/MainWrapper";
import Popup from "@/components/layout/popup/Popup";
import { prefetchGetBestReviewList } from "@/api/review/queries/prefetchGetBestReviewList";
import { prefetchGetStoreItemList } from "@/api/store/queries/prefetchGetStoreItemList";
import { prefetchGetMainBannerInfo } from "@/api/main/queries/prefetchGetMainBannerInfo";
import { cookies } from "next/headers";

export default async function MainPage() {
  const queryClient = new QueryClient();
  await prefetchGetMainBannerInfo(queryClient);
  await prefetchGetBestReviewList(queryClient);
  await prefetchGetStoreItemList(queryClient);

  const dehydrateState = dehydrate(queryClient);

  // SSR 시 서버에서 초기 숨김 팝업 ID 목록 가져오기
  const raw = cookies().get("hiddenPopups")?.value ?? "";
  const initialHiddenPopupIds = raw
    .split(",")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));

  return (
    <HydrationBoundary state={dehydrateState}>
      <MainWrapper />
      <Popup initialHiddenPopupIds={initialHiddenPopupIds} />
    </HydrationBoundary>
  );
}
