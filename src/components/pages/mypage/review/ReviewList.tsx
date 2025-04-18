'use client';
import * as styles from './ReviewList.css';
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import TabBar from "@/components/common/tabBar/TabBar";
import Dropdown from "@/components/common/dropdown/Dropdown";
import EmptyStateReview from "@/components/pages/mypage/common/emptyState/emptyState/EmptyState";
import ReviewListContainer from "@/components/pages/mypage/review/reviewListContainer/ReviewListContainer";
import ReviewCard from "@/components/pages/mypage/common/cards/section/ReviewCard";
import { prefetchGetWrittenReviewList, useGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";
import { prefetchGetWritableReviewList, useGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";
import { ReviewItemType } from '@/types';

const ItemTypeFilterList = {
  'ALL': { label: '전체보기' },
  'SUBSCRIBE': { label: '구독상품' },
  'ITEM': { label: '일반상품' },
} as const;

const ItemTypeFilterComponent = () => {
  const { pushWithQuery } = useDynamicQueryPush();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedLabel = ItemTypeFilterList[searchParams.get("itemType") as keyof typeof ItemTypeFilterList]?.label || "전체보기";

  return (
    <Dropdown
      label={selectedLabel}
      options={Object.entries(ItemTypeFilterList).map(([value, { label }]) => ({label, value}))}
      onSelect={(value) => pushWithQuery(pathname, { itemType: value })}
      className={styles.reviewItemTypeFilter}
    />
  )
}

const Review = () => {
  const { pushWithQuery } = useDynamicQueryPush();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const reviewItemType = searchParams.get('itemType');
  const allReviewItems = !reviewItemType || reviewItemType === 'ALL';

  const tab = searchParams.get('tab');
  const checkTabIndex = (!tab || tab === 'writable') ? 0 : 1;

  const hasOrderHistory = true;

  const tabs = [
    {
      label: '작성 가능한 리뷰',
      content:
        <ErrorBoundary fallback={<div>작성 가능한 리뷰가 없습니다.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ItemTypeFilterComponent />
            <ReviewListContainer
              reviewItemType={reviewItemType as ReviewItemType}
              allReviewItems={allReviewItems}
              useGetReviewList={useGetWritableReviewList}
              listKey='writableReviewList'
              EmptyStateComponent={() => <EmptyStateReview hasOrderHistory={hasOrderHistory} />}
              ReviewCardComponent={({ review }) => (
                <ReviewCard isWritableReview reviewDetail={review} />
              )}
            />
          </Suspense>
        </ErrorBoundary>
      ,
      onInit: () => handleTabInit('writable'),
    },
    {
      label: '내가 작성한 리뷰',
      content:
        <ErrorBoundary fallback={<div>작성한 리뷰가 없습니다.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ItemTypeFilterComponent />
            <ReviewListContainer
              reviewItemType={reviewItemType as ReviewItemType}
              allReviewItems={allReviewItems}
              useGetReviewList={useGetWrittenReviewList}
              listKey='writtenReviewList'
              EmptyStateComponent={() => <EmptyStateReview type='writtenReviewList' />}
              ReviewCardComponent={({ review }) => (
                <ReviewCard reviewDetail={review} />
              )}
            />
          </Suspense>
        </ErrorBoundary>
      ,
      onInit: () => handleTabInit('written'),
    },
  ]

  const handleTabInit = async (type: 'written' | 'writable') => {
    pushWithQuery(pathname, { tab: type }, ['itemType']);
    if (type === 'written') {
      await prefetchGetWrittenReviewList(queryClient);
    } else {
      await prefetchGetWritableReviewList(queryClient);
    }
  }

  return (
    <section>
      <TabBar
        hasTabContent
        variant='segmentedButton'
        tabs={tabs}
        defaultIndex={checkTabIndex}
        className={styles.reviewTab}
      />
    </section>
  );
};

export default Review;