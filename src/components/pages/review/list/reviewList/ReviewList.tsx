"use client";
import { useState } from "react";
import ReviewItem from "@/components/domain/review/reviewItem/ReviewItem";
import Divider from "@/components/ui/divider/Divider";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useGetInfiniteReviewList } from "@/api/review/queries/useGetInfiniteReviewList";

export default function ReviewList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteReviewList();
  const reviewList = useFlattenedInfiniteData(data, "itemReviewList");

  const ref = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const [openReviewIds, setOpenReviewIds] = useState<number[]>([]);

  const handleToggleReviewIds = (isOpen: boolean, reviewId: number) => {
    if (isOpen) {
      setOpenReviewIds(openReviewIds.filter((id) => id !== reviewId));
    } else {
      setOpenReviewIds([...openReviewIds, reviewId]);
    }
  };

  return (
    <article>
      {reviewList?.map((review) => {
        const reviewId = review.reviewId;
        const isOpen = openReviewIds.includes(reviewId);
        return (
          <div key={reviewId}>
            <ReviewItem
              reviewId={reviewId}
              reviewer={review.reviewer}
              contents={review.contents}
              star={review.star}
              writtenDate={review.writtenDate}
              isExpanded={isOpen}
              hasReviewImages={review.hasReviewImages}
              backgroundColor={isOpen ? "gray50" : "white"}
              onToggle={() => handleToggleReviewIds(isOpen, reviewId)}
            />
            <Divider height={1} color="gray50" />
          </div>
        );
      })}
      <InfiniteScrollTrigger
        ref={ref}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </article>
  );
}
