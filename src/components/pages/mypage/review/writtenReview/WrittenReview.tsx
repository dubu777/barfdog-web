import * as styles from '../ReviewList.css';
import { useEffect } from "react";
import ReviewCard from "@/components/pages/mypage/layout/cards/section/ReviewCard";
import EmptyStateReview from "@/components/pages/mypage/layout/emptyState/emptyState/EmptyState";
import { useInView } from "react-intersection-observer";
import { useGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";

const WrittenReview = ({ onInit }: { onInit: () => void }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetWrittenReviewList();
  const { ref, inView } = useInView();
  console.log(data);
  // const writtenReviewList = data?.pages[0].writtenReviewList || [];
  const writtenReviewList = data?.pages
    ?.map((page) => page.writtenReviewList)
    .flat() || [];

  console.log(writtenReviewList)
  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  useEffect(() => {
    onInit();
  }, [onInit])

  return (
    <article className={styles.reviewListContainer({ isEmpty: !writtenReviewList || writtenReviewList.length === 0 })}>
      {writtenReviewList.length > 0
        ?
        <>
        <ul className={styles.reviewList}>
          {writtenReviewList.map((review, index) => (
            <li key={`${review.id}-${index}`} className={styles.reviewItem}>
              <ReviewCard reviewDetail={review} />
            </li>
          ))}
        </ul>
          <div ref={ref} className={styles.infiniteTrigger} />
        </>
        : <EmptyStateReview isWrittenReview />
      }
    </article>
  );
};

export default WrittenReview;