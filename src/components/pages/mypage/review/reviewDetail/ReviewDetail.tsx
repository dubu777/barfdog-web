'use client';
import { useState } from "react";
import * as styles from './ReviewDetail.css';
import Image from "next/image";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useBackNavigation } from "@/utils";
import MoreHorizIcon from "/public/images/icons/more_horiz.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import ReviewCard from "@/components/pages/mypage/common/cards/section/ReviewCard";
import Dropdown from "@/components/common/dropdown/Dropdown";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import Chips from "@/components/common/chips/Chips";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/hooks/useModal";
import { ReviewDetailItem, ReviewItemType } from "@/types";
import { useToastStore } from '@/store/useToastStore';
import { sanitizedHTML } from "@/styles/common.css";
import { textStyles } from "@/components/common/defaultText/DefaultText.css";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { useGetReviewDetail } from "@/api/review/queries/useGetReviewDetail";
import { useDeleteReview } from "@/api/review/mutations/useDeleteReview";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ReviewDetailProps {
  reviewId: number;
  reviewType: ReviewItemType;
}

const ReviewDetail = ({ reviewId, reviewType }: ReviewDetailProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const goBackPreviousPage = useBackNavigation(undefined, true);

  const { data } = useGetReviewDetail(reviewId);
  const { addToast } = useToastStore();
  const { pushWithQuery } = useDynamicQueryPush();

  const currentPage = Number(searchParams.get('page'));
  const { mutate } = useDeleteReview(currentPage);

  const [showImageSlide, setShowImageSlide] = useState<boolean>(false);
  const [defaultImageId, setDefaultImageId] = useState<number | null>(null);
  const defaultImageIndex = data?.reviewImageDtoList?.findIndex(item => item.id === defaultImageId);
  const reviewImageList = data?.reviewImageDtoList || [];

  const { isOpen: editModalOpen, onToggle: onEditModalToggle, onClose: onEditModalClose } = useModal();
  const { isOpen: deleteModalOpen, onToggle: onDeleteModalToggle, onClose: onDeleteModalClose } = useModal();

  const reviewDetail: ReviewDetailItem = {
    ...data.reviewDto,
    reviewType
  }

  const hasReviewRewardHistory = false;

  const sanitizedHTMLContents = useSanitizedHTML(reviewDetail?.contents || '');


  const handleEditOrDelete = (type: 'edit' | 'delete' | 'deleteConfirm') => {
    switch (type) {
      case 'edit':
        if (!hasReviewRewardHistory) {
          pushWithQuery(`${pathname}/update`, { reviewType: reviewDetail.reviewType as ReviewItemType }, ['page']);
        } else {
          onEditModalToggle();
        }
        break;
      case 'delete':
        onDeleteModalToggle();
        break;
      case 'deleteConfirm':
        mutate(
          reviewDetail.id,
          {
            onSuccess: () => {
              goBackPreviousPage();
              addToast('작성한 리뷰가 삭제되었습니다');
            },
          }
        )
        break;
      default: return;
    }
  }
  const handleShowImageSlide = (previewId: number) => {
    setShowImageSlide(!showImageSlide);
    setDefaultImageId(previewId);
  }
  return (
    <section className={styles.reviewDetailContainer}>
      <div className={styles.reviewDetailHeader}>
        <DefaultText type='title4'>{format(new Date(reviewDetail.writtenDate), 'yy. MM. dd')} 리뷰 완료</DefaultText>
        <Dropdown
          trigger={<SvgIcon src={MoreHorizIcon} size={24} />}
          options={[
            { label: "수정하기", value: "edit" },
            { label: "삭제하기", value: "delete" },
          ]}
          onSelect={(value) => handleEditOrDelete(value as 'edit' | 'delete')}
          style={{ right: 0 }}
        />
      </div>
      <article>
        <ReviewCard isReviewDetail reviewDetail={reviewDetail} />
      </article>
      <article className={`${styles.reviewDetailBox} ${styles.reviewDetailContents}`}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTMLContents }} className={`${textStyles.body3} ${sanitizedHTML}`} style={{ textAlign: 'left' }} />
      </article>
      {showImageSlide && defaultImageId && (
        <article className={styles.reviewDetailImageList}>
          <Swiper
            slidesPerView='auto'
            initialSlide={defaultImageIndex}
          >
            {reviewImageList.map((reviewImage, index) => (
              <SwiperSlide
                key={reviewImage.filename}
                className={styles.reviewImageSlider}
              >
                <Chips variant='solid' color='red' borderRadius='lg' size='lg' className={styles.reviewImageCountChip}>
                  {index+1}/{reviewImageList.length}
                </Chips>
                <Image src={reviewImage.url} alt={reviewImage.filename} sizes="335px" fill className={styles.reviewImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      )}
      {data?.reviewImageDtoList?.length > 0 &&
        <article className={styles.reviewDetailBox}>
          <ImageCarousel imageList={data.reviewImageDtoList} handleShowImageList={handleShowImageSlide} />
        </article>
      }
      <article className={styles.reviewDetailComment}>
        <div className={styles.noComment}>
          <DefaultText type='label4'>댓글0</DefaultText>
          <DefaultText type='caption' color='gray600'>아직 댓글이 달리지 않았습니다.</DefaultText>
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
      {deleteModalOpen &&
        <Modal
          isOpen={deleteModalOpen}
          onClose={onDeleteModalClose}
          title="작성 후기를 삭제하시겠습니까?"
          content={`삭제된 후기는 복구할 수 없으며,\n지급된 적립금은 회수됩니다.`}
          confirmText="확인"
          cancelText="취소"
          onConfirm={() => handleEditOrDelete('deleteConfirm')}
          onCancel={onDeleteModalClose}
        />
      }
      {editModalOpen &&
        <Modal
          isOpen={editModalOpen}
          onClose={onEditModalClose}
          title="리뷰 수정안내"
          content='적립금이 지급된 후기는 수정이 불가합니다'
          confirmText="확인"
          onConfirm={onEditModalClose}
        />
      }
    </section>
  );
};

export default ReviewDetail;