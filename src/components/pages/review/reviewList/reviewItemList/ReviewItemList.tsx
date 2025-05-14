'use client';
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetReviewList, useGetReviewList } from "@/api/review/queries/useGetReviewList";
import { usePagination } from "@/hooks/usePagination";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import Pagination from "@/components/common/pagination/Pagination";
import ReviewInfoWithImages from "@/components/pages/review/common/ReviewInfoWithImages";
import Divider from "@/components/common/divider/Divider";

const ReviewItemList = () => {
  const queryClient = useQueryClient();

  const { pushWithQuery } = useDynamicQueryPush();
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetReviewList(queryClient, page),
    pushWithQuery,
    callback: () => setOpenReviewIds([])
  })

  const { data } = useGetReviewList(currentPage);
  const reviewList = data?.reviewList || [];
  const [openReviewIds, setOpenReviewIds] = useState<number[]>([]);

  const paginationProps = useMemo(() => ({
    currentPage, totalPages, onPageChange
  }), [currentPage, totalPages, onPageChange]);

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page)
    }
  }, [data.page, setPaginationData]);

  const handleToggleReviewIds = (isOpen: boolean, reviewId: number) => {
    if(isOpen) {
      setOpenReviewIds(openReviewIds.filter(id => id !== reviewId))
    } else {
      setOpenReviewIds([...openReviewIds, reviewId])
    }
  }

  return (
    <article>
      {reviewList?.map(review => {
        const reviewDetail = review.reviewDto;
        const reviewImageList = review.reviewImageDtoList;
        const reviewId = reviewDetail.id;
        const isOpen = openReviewIds.includes(reviewId);
        return (
          <div key={reviewId}>
            <ReviewInfoWithImages
              username={reviewDetail.username}
              contents={reviewDetail.contents}
              star={reviewDetail.star}
              writtenDate={reviewDetail.writtenDate}
              showContents={isOpen}
              reviewImageList={reviewImageList}
              backgroundColor={isOpen ? 'gray50' : 'white'}
              handleToggleReviewIds={() => handleToggleReviewIds(isOpen, reviewId)}
            />
            <Divider thickness={1} color='gray50' />
          </div>
        )
      })}
      <Pagination {...paginationProps} />
    </article>
  );
};

export default ReviewItemList;