import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetNoticeDetail } from "@/api/community/queries/useGetNoticeDetail";
import NoticeDetail from "@/components/pages/community/notice/noticeDetail/NoticeDetail";

interface NoticeDetailPageProps {
  params: { noticeId: string };
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const noticeId = Number(params.noticeId);
  const queryClient = new QueryClient();
  await prefetchGetNoticeDetail(queryClient, noticeId);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상세 공지사항이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <NoticeDetail noticeId={noticeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
