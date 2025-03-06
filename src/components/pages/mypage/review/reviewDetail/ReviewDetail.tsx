'use client';
import * as styles from './ReviewDetail.css';
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetReviewDetail } from "@/api/review/queries/useGetReviewDetail";
import MoreHorizIcon from "/public/images/icons/more_horiz.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import ReviewCard from "@/components/pages/mypage/layout/cards/reviewCard/ReviewCard";
import Dropdown from "@/components/common/dropdown/Dropdown";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import ReviewImagesModal from "@/components/pages/mypage/review/reviewImagesModal/ReviewImagesModal";
import useModal from "@/hooks/useModal";
import { formatDate } from "@/utils";
import { ReviewDetailItem, ReviewType } from "@/types";
import { useToastStore } from '@/store/useToastStore';
import { sanitizedHTML } from "@/styles/common.css";
import { textStyles } from "@/components/common/defaultText/DefaultText.css";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { useDeleteReview } from "@/api/review/mutations/useDeleteReview";
import { prefetchGetReviewDetailImageList } from "@/api/review/queries/useGetReviewDetailImageList";

interface ReviewDetailProps {
  reviewId: number;
  reviewType: ReviewType;
}

const ReviewDetail = ({ reviewId, reviewType }: ReviewDetailProps) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data } = useGetReviewDetail(reviewId);
  const { addToast } = useToastStore();
  const { pushWithQuery } = useDynamicQueryPush();

  const currentPage = Number(searchParams.get('page'));
  const { mutate } = useDeleteReview(currentPage);
  const { isOpen, onToggle, onClose } = useModal();

  const reviewDetail: ReviewDetailItem = {
    ...data.reviewDto,
    reviewType
  }
  const sanitizedHTMLContents = useSanitizedHTML(reviewDetail?.contents || '');

  const handleOpenReviewImageModal = async () => {
    await prefetchGetReviewDetailImageList(queryClient, reviewDetail.id);
    onToggle();
  }

  const handleEditOrDelete = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      // 수정 페이지 이동
      pushWithQuery(`${pathname}/update`, { reviewType: reviewDetail.reviewType as ReviewType });
    } else {
      // 삭제 기능
      mutate(
        reviewDetail.id,
        {
          onSuccess: () => {
            addToast('리뷰 삭제가 완료되었습니다!', 'success');
          },
        }
      )
    }
  }

  return (
    <section className={styles.reviewDetailContainer}>
      <div className={styles.reviewDetailHeader}>
        <DefaultText type='title4'>{formatDate(reviewDetail.writtenDate, 'onlyDate')} 리뷰 완료</DefaultText>
        <Dropdown
          trigger={<MoreHorizIcon />}
          options={[
            { label: "수정하기", value: "edit" },
            { label: "삭제하기", value: "delete" },
          ]}
          onSelect={(value) => handleEditOrDelete(value as 'edit' | 'delete')}
          position="right"
        />
      </div>
      <article>
        <ReviewCard isReviewDetail reviewDetail={reviewDetail} />
      </article>
      <article className={`${styles.reviewDetailBox} ${styles.reviewDetailContents}`}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTMLContents }} className={`${textStyles.body3} ${sanitizedHTML}`} style={{ textAlign: 'left' }} />
      </article>
      {data.reviewImageDtoList.length > 0 &&
        <article className={styles.reviewDetailBox}>
          <ImageCarousel imageList={data.reviewImageDtoList} handleImageModalClick={handleOpenReviewImageModal} />
          <div className={styles.likeCommentCount}>

          </div>
        </article>
      }
      <article className={styles.reviewDetailComment}>
        <div className={styles.noComment}>
          <DefaultText type='label4' inlineBlock>댓글0</DefaultText>
          <DefaultText type='caption' color='gray600' inlineBlock>아직 댓글이 달리지 않았습니다.</DefaultText>
        </div>
        <div className={styles.commentHeader}>
          <div className={styles.profile} />
          <DefaultText type='label4'>바프독 관리자</DefaultText>
          <DefaultText type='caption' color='gray600'>N일 전</DefaultText>
        </div>
        <DefaultText type='caption' color='gray600'>
          안녕하세요 바프독 고객님<br/>
          기존 작성 후기와 동일한 사진 사용 및 단순문구 반복으로 글자수를 충족한 경우 후기 승인이 반려될 수 있음을 안내드립니다.
        </DefaultText>
      </article>
      {isOpen && reviewDetail.id && <ReviewImagesModal reviewId={reviewDetail.id} isOpen={isOpen} onClose={onClose} />}
    </section>
  );
};

export default ReviewDetail;