import * as styles from './WrittenReview.css';
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import ReviewCard from "@/components/pages/mypage/layout/cards/reviewCard/ReviewCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { prefetchGetWrittenReviewList, useGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";

const WrittenReview = ({ onInit }: { onInit: () => void }) => {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetWrittenReviewList(queryClient, page),
    pushWithQuery,
  })
  const paginationProps = useMemo(() => ({
    currentPage,
    totalPages,
    onPageChange,
  }), [currentPage, totalPages, onPageChange]);
  const { data } = useGetWrittenReviewList(currentPage);
  const writtenReviewList = data?.writtenReviewList;

  useEffect(() => {
    if (data?.page) {
      setPaginationData(data.page);
    }
  }, [data?.page, setPaginationData]);

  useEffect(() => {
    onInit();
  }, [onInit])

  return (
    <article className={styles.writtenReviewContainer({ isEmpty: !writtenReviewList || writtenReviewList.length === 0 })}>
      {!writtenReviewList || writtenReviewList.length === 0
        ? <Text type='description' size='sm' color='grey'>
          작성한 리뷰가 없습니다.
        </Text>
        :
        <>
        <ul className={styles.writtenList}>
          {writtenReviewList.map(review => (
            <li key={review.id} className={styles.writtenReview}>
              <ReviewCard reviewDetail={review} />
            </li>
          ))}
        </ul>
        <Pagination
          {...paginationProps}
        />
        </>
      }
    </article>
  );
};

export default WrittenReview;