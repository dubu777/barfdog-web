'use client';
import * as styles from './ReviewItemList.css';
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetReviewList, useGetReviewList } from "@/api/review/queries/useGetReviewList";
import { usePagination } from "@/hooks/usePagination";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import ReviewItem from "@/components/pages/reivew/reviewList/reviewItemList/reviewItem/ReviewItem";

const ReviewItemList = () => {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetReviewList(queryClient, page),
    pushWithQuery,
  })

  const paginationProps = useMemo(() => ({
    currentPage, totalPages, onPageChange
  }), [currentPage, totalPages, onPageChange]);
  
  const { data } = useGetReviewList(currentPage);
  const reviewList = data?.reviewList || [];

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page)
    }
  }, [data.page, setPaginationData])

  return (
    <article>
      <div className={styles.itemListHeader}>
        <Text type='title' size='titleLg' weight='bold' align='left'>리뷰</Text>
      </div>
      <ul className={styles.reviewList}>
        <li className={styles.reviewItem({ isHeader: true })}>
          <Text type='description' size='md' weight='bold' color='black'>
            No.
          </Text>
          <Text type='description' size='md' weight='bold' color='black'>
            상품
          </Text>
          <Text type='description' size='md' weight='bold' color='black'>
            별점
          </Text>
          <Text type='description' size='md' weight='bold' color='black'>
            제목
          </Text>
          <Text type='description' size='md' weight='bold' color='black' />
          <Text type='description' size='md' weight='bold' color='black'>
            등록일
          </Text>
        </li>
        {reviewList.map(reviewItem => {
          const review = reviewItem.reviewDto;
          const reviewImageList = reviewItem.reviewImageDtoList;
          return (
            <ReviewItem key={review.id} review={review} reviewImageList={reviewImageList} />
          )
        })}
      </ul>
      <Pagination {...paginationProps} />
    </article>
  );
};

export default ReviewItemList;