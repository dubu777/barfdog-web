import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetNoticeList } from "@/api/community/queries/useGetNoticeList";
import NoticeList from "@/components/pages/community/notice/noticeList/NoticeList";

export default async function NoticePage() {
  const queryClient = new QueryClient();
  await prefetchGetNoticeList(queryClient, 0);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>공지사항이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <NoticeList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
