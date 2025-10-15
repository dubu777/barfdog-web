import * as styles from './ItemReview.css';
import { commonWrapper } from '@/styles/common.css';
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/common/pagination/Pagination";
import Divider from '@/components/common/divider/Divider';
import EmptyList from '@/components/common/emptyList/EmptyList';
import ReviewItem from '@/components/pages/review/common/reviewItem/ReviewItem';
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { prefetchGetStoreItemReviewList, useGetStoreItemReviewList } from "@/api/review/queries/useGetStoreItemReviewList";

interface ItemReviewProps {
  itemId: number;
}

export default function ItemReview({
  itemId,
}: ItemReviewProps) {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();

  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetStoreItemReviewList(queryClient, itemId, page),
    pushWithQuery,
    preserveScroll: true,
  });

  const paginationProps = useMemo(() => ({
    currentPage, totalPages, onPageChange
  }), [currentPage, totalPages, onPageChange]);

  const { data } = useGetStoreItemReviewList(itemId, currentPage)
  const reviewList = data?.itemReviewList || [];

  console.log(data);

  // 리뷰 아코디언 토글 상태
  const [openReviewIds, setOpenReviewIds] = useState<number[]>([]);

  useEffect(() => {
    if (data?.pagination) {
      setPaginationData({ totalPages: data.pagination.totalPages, page: data.pagination.page });
    }
  }, [data?.pagination, setPaginationData]);

  const handleToggleReviewIds = (isOpen: boolean, reviewId: number) => {
    if(isOpen) {
      setOpenReviewIds(openReviewIds.filter(id => id !== reviewId))
    } else {
      setOpenReviewIds([...openReviewIds, reviewId])
    }
  }

  return (
    <div className={styles.reviewList}>
      {!reviewList.length && 
        <div className={commonWrapper({ paddingBottom: 40 })}>
          <EmptyList title={`등록된 리뷰가 없어요\n이 상품의 첫 번째 리뷰를 작성해 보세요`} />
        </div>
      }
      {reviewList.length > 0 &&
        <>
          {reviewList?.map(review => {
            const reviewId = review.reviewId;
            const isOpen = openReviewIds.includes(reviewId);
            return (
              <div key={reviewId}>
                <ReviewItem
                  reviewId={reviewId}
                  username={review.reviewer}
                  contents={review.contents}
                  star={review.star}
                  writtenDate={review.writtenDate}
                  isExpanded={isOpen}
                  hasReviewImages={review.hasReviewImages}
                  backgroundColor={isOpen ? 'gray50' : 'white'}
                  onToggle={() => handleToggleReviewIds(isOpen, reviewId)}
                />
                <Divider thickness={1} color='gray50' />
              </div>
            )
          })}
          <Pagination {...paginationProps} />
        </>
      }
    </div>
  );
};