import * as styles from './ItemReview.css';
import { ellipsis } from "@/styles/common.css";
import { useEffect, useMemo } from "react";
import Text from "@/components/common/text/Text";
import RateStar from "@/components/common/rateStar/RateStar";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Accordion from "@/components/common/accordion/Accordion";
import Pagination from "@/components/common/pagination/Pagination";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetStoreItemReviewList, useGetStoreItemReviewList } from "@/api/store/queries/useGetStoreItemReviewList";
import { getMaskUserName } from "@/utils/getMaskUserName";

interface ItemReviewProps {
  itemId: number;
}

const ItemReview = ({ itemId }: ItemReviewProps) => {
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
  const reviewList = data?.reviewList || [];

  const totalStars = Number(reviewList.reduce((acc, review) => acc + review.reviewDto.star, 0).toFixed(1)) || 0;
  const averageStar = Number(totalStars / reviewList.length || 0).toFixed(1);

  useEffect(() => {
    if (data?.page) {
      setPaginationData(data.page)
    }
  }, [data?.page, setPaginationData]);

  return (
    <div className={styles.itemReviewContainer}>
      <div className={styles.itemReviewTop}>
        <Text type='description' size='md' color='black'>{reviewList.length}개의 리뷰</Text>
        <div className={styles.averageStar}>
          <Text type='title' size='titleXXl' weight='bold'>{averageStar}&nbsp;/</Text>
          <Text type='title' size='titleXXl' color='grey' weight='bold'>&nbsp;5.0</Text>
        </div>
        <RateStar rateLength={Number(averageStar)} color='yellow' size='xxl' />
      </div>
      <div className={styles.createAdminReview}>
        <DefaultButton type='main' borderRadius='sm'>
          관리자 후기 생성
        </DefaultButton>
      </div>
      <ul>
        {reviewList.length === 0
          ? <Text type='description' size='md' color='grey' isEmpty>등록되 리뷰가 없습니다.</Text>
          : reviewList.map(review => {
            const reviewDetail = review.reviewDto;
            return (
              <li key={reviewDetail.id}>
                <Accordion
                  buttonClassName={styles.reviewAccordionTitleBox}
                  contentClassName={styles.reviewAccordionBox}
                  title={
                    <>
                      <div className={styles.accordionTitleLeft}>
                        <RateStar rateLength={reviewDetail.star} color='yellow' />
                        <Text type='description' size='sm' color='grey' align='left' className={ellipsis({ lineSize: 'line1', align: 'left' })}>
                          {reviewDetail.contents}
                        </Text>
                      </div>
                      <div className={styles.accordionTitleRight}>
                        {reviewDetail.username && 
                          <Text type='description' size='sm' color='black' align='right' className={ellipsis({ lineSize: 'line1' })}>
                            {getMaskUserName(reviewDetail.username)}
                          </Text>
                        }
                        <Text type='description' size='sm' color='grey' align='right'>
                          {reviewDetail.createdDate}
                        </Text>
                      </div>
                    </>
                  }
                  showArrow={false}
                >
                  <Text type='description' size='sm' align='left' color='grey'>
                    {reviewDetail.contents}
                  </Text>
                </Accordion>
              </li>
            )
          })
        }
      </ul>
      <Pagination {...paginationProps} />
    </div>
  );
};

export default ItemReview;