import * as styles from './WritableReview.css';
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import {  WritableReviewItem } from "@/types";
import { reviewType } from "@/constants";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetWritableReviewList, useGetWritableReviewList } from "@/api/review/queries/useGetWritableReviewList";
import { useReviewStore } from "@/store/useReviewStore";
import { formatDate } from "@/utils/dateUtils";

const WritableReview = ({ onInit }: { onInit: () => void }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
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

  const { setReviewFormData } = useReviewStore();

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page);
    }
  }, [data.page, setPaginationData, writableReviewList.length, currentPage])

  useEffect(() => {
    onInit();
  }, [onInit])

  const handleMoveToCreate = (review: WritableReviewItem) => {
    setReviewFormData(review);
    router.push(`/mypage/review/create`)
  }
  console.log('writableReviewList', data)

  return (
    <article className={styles.writableReviewContainer({ isEmpty: writableReviewList.length === 0 })}>
      {writableReviewList.length === 0
        ? <Text type='description' size='sm' color='grey'>
          작성 가능한 리뷰가 없습니다.
        </Text>
        :
        <>
        <ul className={styles.writableList}>
          {writableReviewList
            .map(review => (
              <li key={review.id} className={styles.writableReview}>
                <Image src={review.imageUrl} alt={review.title} width={100} height={100} />
                <div className={styles.reviewInfo}>
                  <Text type='description' size='md' weight='bold' color='black'>{review.title}</Text>
                  <Text type='description' size='sm' color='grey'>{reviewType[review.reviewType]}</Text>
                  <Text type='description' size='sm' color='grey'>주문 일자: {formatDate(review.orderedDate, 'fullDateTime')}</Text>
                </div>
                <div className={styles.createReviewButton}>
                  <DefaultButton
                    type='mainBorder'
                    borderRadius='sm'
                    onClick={() => handleMoveToCreate(review)}
                  >
                    후기 작성하기
                  </DefaultButton>
                </div>
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