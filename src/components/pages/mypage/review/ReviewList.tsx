'use client';
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as styles from './ReviewList.css';
import Tabs from "@/components/common/tabs/Tabs";
import WritableReview from "@/components/pages/mypage/review/writableReview/WritableReview";
import WrittenReview from "@/components/pages/mypage/review/writtenReview/WrittenReview";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { usePathname, useSearchParams } from "next/navigation";
import { prefetchGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";

const Review = () => {
  const { pushWithQuery } = useDynamicQueryPush();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const tap = searchParams.get('tab');
  const checkTabIndex = (!tap || tap === 'writable') ? 0 : 1 || 0;

  const tabs = [
    {
      label: '작성 가능한 후기',
      content:
        <ErrorBoundary fallback={<div>작성 가능한 리뷰가 없습니다.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WritableReview onInit={() => console.log('WritableReview initialized')} />
          </Suspense>
        </ErrorBoundary>
      ,
      onInit: () => handleTabInit('writable'),
    },
    {
      label: '작성한 후기',
      content:
            <WrittenReview onInit={() => console.log('WrittenReview initialized')} />
       // <ErrorBoundary fallback={<div>작성한 리뷰가 없습니다.</div>}>
       //    <Suspense fallback={<div>Loading...</div>}>
       //    </Suspense>
       //  </ErrorBoundary>
      ,
      onInit: () => handleTabInit('written'),
    },
  ]

  const handleTabInit = async (type: 'written' | 'writable') => {
    pushWithQuery(pathname, { tab: type, page: 1 });
    if (type === 'written') {
      await prefetchGetWrittenReviewList(queryClient, 0);
    } else {
      await prefetchGetWritableReviewList(queryClient, 0);
    }
  }

  return (
    <section className={styles.reviewContainer}>
      <Tabs tabs={tabs} defaultIndex={checkTabIndex} />
    </section>
  );
};

export default Review;