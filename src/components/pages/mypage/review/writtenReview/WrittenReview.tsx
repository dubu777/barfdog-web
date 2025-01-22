import * as styles from './WrittenReview.css';
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import RateStar from "@/components/common/rateStar/RateStar";
import { reviewStatus, reviewType } from "@/constants";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetWrittenReviewList, useGetWrittenReviewList } from "@/api/review/queries/useGetWrittenReviewList";
import { useDeleteReview } from "@/api/review/mutations/useDeleteReview";
import { WrittenReviewItem } from "@/types";
import { useReviewStore } from "@/store/useReviewStore";
import { useToastStore } from "@/store/useToastStore";
import {prefetchGetReviewDetailImageList} from "@/api/review/queries/useGetReviewDetailImageList";
import useModal from "@/hooks/useModal";
import ReviewImagesModal from "@/components/pages/mypage/review/reviewImagesModal/ReviewImagesModal";

const WrittenReview = ({ onInit }: { onInit: () => void }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isOpen, onToggle, onClose } = useModal();
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

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

  // const { data, isError, isLoading } = useGetWrittenReviewList(currentPage);
  const { data } = useGetWrittenReviewList(currentPage);
  const writtenReviewList = data?.writtenReviewList;

  const { mutate } = useDeleteReview(currentPage);
  const { setReviewFormData } = useReviewStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (data?.page) {
      setPaginationData(data.page);
    }
  }, [data?.page, setPaginationData]);

  useEffect(() => {
    onInit();
  }, [onInit])

  const handleOpenReviewImages = async (reviewId: number) => {
    await prefetchGetReviewDetailImageList(queryClient, reviewId);
    setSelectedReviewId(reviewId);
    onToggle();
  }

  const handleMoveToEdit = (review: WrittenReviewItem) => {
    setReviewFormData(review);
    router.push(`/mypage/review/${review.id}?reviewType=${review.reviewType}`)
  }

  const handleDeleteReview = (reviewId: number) => {
    mutate(
      reviewId,
      {
        onSuccess: () => {
          addToast('리뷰 삭제가 완료되었습니다!', 'success')
        },
      }
    )
  }

  console.log('writtenReviewList', writtenReviewList)
  return (
    <article className={styles.writtenReviewContainer({ isEmpty: !writtenReviewList || writtenReviewList.length === 0 })}>
      {!writtenReviewList || writtenReviewList.length === 0
        ? <Text type='description' size='sm' color='grey'>
          작성한 리뷰가 없습니다.
        </Text>
        :
        <>
        <ul className={styles.writtenList}>
          {writtenReviewList.map(review => {
            const isOpenReviewImagesModal = review.imageCount > 0;
            return (
              <li key={review.id} className={styles.writtenReview}>
                <div className={styles.reviewInfo}>
                  <div className={styles.reviewTitle}>
                    {review.thumbnailUrl &&
                    <Image src={review.thumbnailUrl} alt={review.title} width={50} height={50} className={styles.reviewImage} />
                    }
                    <div>
                      <Text type='description' size='sm' color='black' weight='bold' align='left'>{review.title}</Text>
                      <Text type='description' size='xs' color='black' align='left'>({reviewType[review.reviewType]})</Text>
                    </div>
                  </div>
                  <RateStar rateLength={review.star} color='yellow' align='left' />
                  <Text type='description' size='sm' color='grey' align='left'>{review.contents}</Text>
                  {review.imageUrl &&
                  <button
                    onClick={() => isOpenReviewImagesModal ? handleOpenReviewImages(review.id) : undefined}
                    className={styles.reviewImageButton({ openReviewImages: isOpenReviewImagesModal })}
                  >
                    <Image src={review.imageUrl} alt={review.title} width={150} height={150} className={styles.reviewImage} />
                    {review.imageCount > 1 &&
                      <span className={styles.imageCount}>+{review.imageCount - 1}</span>
                    }
                  </button>
                  }
                  <Text type='description' size='xs' color='grey' align='left'>{review.createdDate}</Text>
                </div>
                <Text className={styles.reviewStatus} type='description' size='sm' color='black'>{reviewStatus[review.status]}</Text>
                <div className={styles.writtenButtonControls}>
                  <DefaultButton onClick={() => handleMoveToEdit(review)} type='mainBorder' borderRadius='sm'>수정</DefaultButton>
                  <DefaultButton onClick={() => handleDeleteReview(review.id)} type='grayBorder' borderRadius='sm'>삭제</DefaultButton>
                </div>
              </li>
            )
          })}
        </ul>
        <Pagination
          {...paginationProps}
        />
        {isOpen && selectedReviewId && <ReviewImagesModal reviewId={selectedReviewId} isOpen={isOpen} onClose={onClose} />}
        </>
      }
    </article>
  );
};

export default WrittenReview;