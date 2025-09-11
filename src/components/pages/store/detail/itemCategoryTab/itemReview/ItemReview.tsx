import * as styles from './ItemReview.css';
import { Fragment, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import RateStar from "@/components/common/rateStar/RateStar";
import Pagination from "@/components/common/pagination/Pagination";
import Divider from '@/components/common/divider/Divider';
import Text from "@/components/common/text/Text";
import ImageCarousel from '@/components/common/imageCarousel/ImageCarousel';
import ImagesModal from '@/components/common/modal/imagesModal/ImagesModal';
import { maskString } from "@/utils/maskString";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { useImageModal } from '@/hooks/useImageModal';
import { UploadedFile } from '@/types';
import { prefetchGetStoreItemReviewList, useGetStoreItemReviewList } from "@/api/store/queries/useGetStoreItemReviewList";
import EmptyList from '@/components/common/emptyList/EmptyList';
import { commonWrapper } from '@/styles/common.css';

interface ItemReviewProps {
  itemId: number;
}

export default function ItemReview({
  itemId,
}: ItemReviewProps) {
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

  const [selectedImageList, setSelectedImageList] = useState<UploadedFile[]>([]);

  const {
    isOpen,
    onClose,
    handleThumbnailClick,
    defaultImageIndex,
  } = useImageModal();


  useEffect(() => {
    if (data?.page) {
      setPaginationData(data.page)
    }
  }, [data?.page, setPaginationData]);

  return (
    <div className={styles.reviewList}>
      {reviewList.length > 0 ?
        reviewList.map((review, index) => {
          const imageList = review.reviewImageDtoList.map(review => ({
            filename: review.filename, // 추후 삭제 필요
            url: review.url, // 추후 삭제 필요
            fileId: review.filename,
            fileName: review.filename,
            folder: 'review',
            fileStatus: 'ADDED',
            displayImageUrl: { url: review.url },
          }));
          return (
          <Fragment key={review.reviewDto.id}>
            <div className={styles.reviewItem}>
              <div className={styles.reviewDefaultInfo}>
                <div className={styles.reviewUserName}>
                  <Text type='body3'>
                    {maskString(review?.reviewDto?.username ?? '', 1)}
                  </Text>
                  <RateStar value={review?.reviewDto?.star} rateLength={5} />
                </div>
                <Text type='body3'>
                  {review?.reviewDto?.createdDate}
                </Text>
              </div>
              <Divider thickness={1} color='gray300' />
              <div className={styles.reviewContentsInfo}>
                <ImageCarousel
                  imageList={imageList}
                  handleThumbnailClick={(index) => {
                    handleThumbnailClick(index);
                    setSelectedImageList(imageList as unknown as UploadedFile[]);
                  }}
                />
                <Text type='body2'>{review.reviewDto.contents}</Text>
              </div>
            </div>
            {index !== reviewList.length && 
              <Divider thickness={4} color='gray50' />
            }
            <Pagination {...paginationProps} />
          </Fragment>
        )
        })
        : (
          <div className={commonWrapper({ paddingBottom: 40 })}>
            <EmptyList title={`등록된 리뷰가 없어요\n이 상품의 첫 번째 리뷰를 작성해 보세요`} />
          </div>
        )}
      {isOpen && selectedImageList &&
        <ImagesModal
          isOpen={isOpen}
          onClose={onClose}
          defaultImageIndex={defaultImageIndex}
          imageList={selectedImageList}
        />
      }
    </div>
  );
};