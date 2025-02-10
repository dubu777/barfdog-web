'use client';
import * as styles from './ReviewItemList.css';
import {useEffect, useMemo, useState} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetReviewList, useGetReviewList } from "@/api/review/queries/useGetReviewList";
import { usePagination } from "@/hooks/usePagination";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import ReviewItem from "@/components/pages/reivew/reviewList/reviewItemList/reviewItem/ReviewItem";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { usePathname, useSearchParams } from "next/navigation";

const ReviewItemList = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSortBy, setSelectedSortBy] = useState<string>(searchParams.get('sortBy') || 'RECENT');

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
  }, [data.page, setPaginationData]);

  const handleSortByFilterChange = async (sortFilter: string) => {
    pushWithQuery(pathname, { sortBy: sortFilter });
    setSelectedSortBy(sortFilter)
  }

  return (
    <article>
      <div className={styles.itemListHeader}>
        <Text type='title' size='titleLg' weight='bold' align='left'>리뷰</Text>
        <SelectBox
          id="sortBy"
          options={[{ label: '최근순', value: 'RECENT' }, { label: '등록순', value: 'REGISTRATION' }, { label: '판매량순', value: 'SALEAMOUNT' }]}
          forFilter
          onSelect={(value) => handleSortByFilterChange(value as string)}
          selectedValue={selectedSortBy}
        />
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