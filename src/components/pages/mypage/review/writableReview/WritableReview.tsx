import * as styles from './WritableReview.css';
import { useEffect, useMemo } from "react";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import ReviewCard from "@/components/pages/mypage/layout/cards/reviewCard/ReviewCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetWritableReviewList, useGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";

const WritableReview = ({ onInit }: { onInit: () => void }) => {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();

  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetWritableReviewList(queryClient, page),
    pushWithQuery,
  })
  const paginationProps = useMemo(() => ({
    currentPage,
    totalPages,
    onPageChange,
  }), [currentPage, totalPages, onPageChange]);

  const { data } = useGetWritableReviewList(currentPage);
  const writableReviewList = data?.writableReviewList || [];

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page);
    }
  }, [data.page, setPaginationData, writableReviewList.length, currentPage])

  useEffect(() => {
    onInit();
  }, [onInit])

  return (
    <article className={styles.writableReviewContainer({ isEmpty: writableReviewList.length === 0 })}>
      {writableReviewList.length === 0
        ? <Text type='description' size='sm' color='grey'>
          작성 가능한 리뷰가 없습니다.
        </Text>
        :
        <>
          <ul className={styles.writableList}>
            {writableReviewList.map(review => (
              <li key={review.id} className={styles.writableReview}>
                <ReviewCard isWritableReview reviewDetail={review} />
              </li>
            ))
          }
          </ul>
          <Pagination
            {...paginationProps}
          />
        </>
      }
    </article>
  );
};

export default WritableReview;