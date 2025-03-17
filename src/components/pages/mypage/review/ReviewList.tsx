'use client';
import {Suspense, useEffect, useState} from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as styles from './ReviewList.css';
import TabBar from "@/components/common/tabBar/TabBar";
import Dropdown from "@/components/common/dropdown/Dropdown";
import WritableReview from "@/components/pages/mypage/review/writableReview/WritableReview";
import WrittenReview from "@/components/pages/mypage/review/writtenReview/WrittenReview";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePathname, useSearchParams } from "next/navigation";
import { prefetchGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";

const ItemTypeFilterList = {
  'ALL': { label: '전체보기' },
  'SUBSCRIBE': { label: '구독상품' },
  'ITEM': { label: '일반상품' },
} as const;

const Review = () => {
  const { pushWithQuery } = useDynamicQueryPush();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const tab = searchParams.get('tab');
  const checkTabIndex = (tab === null || tab === 'writable') ? 0 : 1 || 0;

  const [defaultTabIndex, setDefaultTabIndex] = useState(checkTabIndex);

  useEffect(() => {
    setDefaultTabIndex(checkTabIndex);
  }, [tab]);

  const ItemTypeFilterComponent = () => (
    <Dropdown
      label={ItemTypeFilterList[searchParams.get("itemType") as keyof typeof ItemTypeFilterList]?.label || "전체보기"}
      options={Object.entries(ItemTypeFilterList).map(([value, { label }]) => ({label, value}))}
      onSelect={(value) => pushWithQuery(pathname, { itemType: value })}
      position="right"
      className={styles.reviewItemTypeFilter}
    />
  )

  const tabs = [
    {
      label: '작성 가능한 리뷰',
      content:
        <ErrorBoundary fallback={<div>작성 가능한 리뷰가 없습니다.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ItemTypeFilterComponent />
            <WritableReview onInit={() => console.log('WritableReview initialized')} />
          </Suspense>
        </ErrorBoundary>
      ,
      onInit: () => handleTabInit('writable'),
    },
    {
      label: '내가 작성한 리뷰',
      content:
        <ErrorBoundary fallback={<div>작성 가능한 리뷰가 없습니다.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ItemTypeFilterComponent />
            <WrittenReview onInit={() => console.log('WrittenReview initialized')} />
          </Suspense>
        </ErrorBoundary>
      ,
      onInit: () => handleTabInit('written'),
    },
  ]

  const handleTabInit = async (type: 'written' | 'writable') => {
    pushWithQuery(pathname, { tab: type });
    if (type === 'written') {
      await prefetchGetWrittenReviewList(queryClient);
      setDefaultTabIndex(0)
    } else {
      await prefetchGetWritableReviewList(queryClient);
      setDefaultTabIndex(1)
    }
  }

  return (
    <section className={styles.reviewContainer}>
      <TabBar
        hasTabContent
        variant='segmentedButton'
        tabs={tabs}
        defaultIndex={defaultTabIndex}
        className={styles.reviewTab}
      />
    </section>
  );
};

export default Review;