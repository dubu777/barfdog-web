import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import NoticeList from "@/components/pages/community/notice/list/NoticeList";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetInfiniteNoticeList } from "@/api/community/queries/prefetchGetInfiniteNoticeList";

export default async function NoticePage() {
  const queryClient = new QueryClient();
  await prefetchGetInfiniteNoticeList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <NoticeList />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
