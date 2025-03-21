import * as styles from '../ReviewList.css';
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ReviewCard from "@/components/pages/mypage/layout/cards/section/ReviewCard";
import EmptyStateReview from "@/components/pages/mypage/layout/emptyState/emptyState/EmptyState";
import { useGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";

const WritableReview = ({ onInit }: { onInit: () => void }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetWritableReviewList();
  const { ref, inView } = useInView();
  const writableReviewList = data?.pages
    ?.map((page) => page.writableReviewList)
    .flat() || [];


  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  useEffect(() => {
    onInit();
  }, [onInit]);

  const hasOrderHistory = true;

  return (
    <article className={styles.reviewListContainer({ isEmpty: writableReviewList.length === 0 })}>
      {writableReviewList.length > 0
        ?
        <>
          <ul className={styles.reviewList}>
            {writableReviewList.map((review, index) => (
              <li key={`${review.id}-${index}`} className={styles.reviewItem}>
                <ReviewCard isWritableReview reviewDetail={review} />
              </li>
            ))
          }
          </ul>
          <div ref={ref} className={styles.infiniteTrigger} />
        </>
        : <EmptyStateReview hasOrderHistory={hasOrderHistory} />
      }
    </article>
  );
};

export default WritableReview;