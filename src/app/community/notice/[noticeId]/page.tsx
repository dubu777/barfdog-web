import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetNoticeDetail } from "@/api/community/queries/prefetchGetNoticeDetail";
import NoticeDetail from "@/components/pages/community/notice/detail/NoticeDetail";
import Spinner from "@/components/common/spinner/Spinner";

interface NoticeDetailPageProps {
  params: Promise<{
    noticeId: string;
  }>;
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { noticeId } = await params;
  const queryClient = new QueryClient();
  await prefetchGetNoticeDetail(queryClient, Number(noticeId));
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>상세 공지사항이 없습니다.</div>}>
        <Suspense fallback={<Spinner fullscreen />}>
          <NoticeDetail noticeId={Number(noticeId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
