import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import NoticeDetail from "@/components/pages/community/notice/detail/NoticeDetail";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetNoticeDetail } from "@/api/community/queries/prefetchGetNoticeDetail";

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
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <NoticeDetail noticeId={Number(noticeId)} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
