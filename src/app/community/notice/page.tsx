import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetInfiniteNoticeList } from "@/api/community/queries/prefetchGetInfiniteNoticeList";
import NoticeList from "@/components/pages/community/notice/list/NoticeList";
import Spinner from "@/components/common/spinner/Spinner";

export default async function NoticePage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteNoticeList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>공지사항이 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <NoticeList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
