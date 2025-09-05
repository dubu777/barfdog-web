'use client';
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import Divider from "@/components/common/divider/Divider";
import InfoBox from "@/components/common/infoBox/InfoBox";
import ReviewCard from "@/components/pages/mypage/review/common/reviewCard/ReviewCard";
import ImagesModal from "@/components/common/modal/imagesModal/ImagesModal";
import UpdateReviewModal from "@/components/pages/mypage/review/update/UpdateReviewModal";
import useModal from "@/hooks/useModal";
import { useImageModal } from "@/hooks/useImageModal";
import { ReviewItemType, ReviewStatus } from "@/types";
import { useGetReviewDetail } from "@/api/mypage/review/queries/useGetReviewDetail";

interface ReviewDetailProps {
  reviewId: number;
  reviewType: ReviewItemType;
  reviewStatus: ReviewStatus;
}

export default function ReviewDetail({
  reviewId,
  reviewType,
  reviewStatus,
}: ReviewDetailProps) {
  const { data } = useGetReviewDetail(reviewId);

  const reviewInfo = data.reviewInfo;
  const reviewImageList = data.reviewImageList;

  const {
    isOpen: isOpenReviewImageModal,
    onClose: onCloseReviewImageModal,
    handleThumbnailClick,
    defaultImageIndex,
  } = useImageModal();

  const { isOpen: isOpenUpdateModal, onClose: onCloseUpdateModal, onToggle: onToggleUpdateModal } = useModal();

  return (
    <section
      className={commonWrapper({
        backgroundColors: 'gray0',
        direction: 'col',
        justify: 'start',
        minHeight: 'fullWithHeader',
      })}
    >
      {reviewStatus === 'APPROVAL' || reviewStatus === 'ADMIN'
        ? <Divider thickness={2} color='gray50' />
        : (
          <article
            className={commonWrapper({
              backgroundColors: 'gray50',
              padding: 20,
            })}
          >
            <InfoBox
              text={
                reviewStatus === 'REQUEST'
                  ? '관리자 확인 후 승인되면 적립금이 지급됩니다'
                  : (
                    <>
                      반려 사유: 적용 필요<br/>
                      <Text type='caption2' color='pastelRed'>
                        반려 사유를 확인하신 후 리뷰를 수정해 보세요. 수정 시 해당 리뷰는 승인대기 상태로 변경되고 승인되면 적립금이 지급됩니다.
                      </Text>
                    </>
                  )
              }
              color={reviewStatus === 'RETURN' ? 'red' : 'gray'}
              fullWidth
            />
          </article>
        )
      }
      <ReviewCard
        id={reviewId}
        title={reviewInfo.title}
        reviewType={reviewType}
        thumbnailUrl={reviewInfo?.thumbnailUrl}
        status={reviewStatus}
        createdDate={reviewInfo?.writtenDate}
        star={reviewInfo?.star}
        handleUpdate={onToggleUpdateModal}
      />
      <Divider thickness={4} color='gray50' />
      {data?.reviewImageList?.length > 0 &&
        <article
          className={commonWrapper({
            backgroundColors: 'gray0',
            padding: 20,
          })}
        >
          <ImageCarousel
            imageList={data.reviewImageList}
            handleThumbnailClick={handleThumbnailClick}
            showRepresentativeLabel
          />
        </article>
      }
      <Divider thickness={4} color='gray50' />
      <article
        className={commonWrapper({
          padding: 20,
          justify: 'start',
        })}
      >
        <Text type='body2' preLine>{reviewInfo.contents}</Text>
      </article>
      {isOpenReviewImageModal &&
        <ImagesModal
          isOpen={isOpenReviewImageModal}
          onClose={onCloseReviewImageModal}
          defaultImageIndex={defaultImageIndex}
          imageList={reviewImageList}
        />
      }
      {isOpenUpdateModal &&
        <UpdateReviewModal
          data={data}
          reviewType={reviewType}
          isOpen={isOpenUpdateModal}
          onClose={onCloseUpdateModal}
        />
      }
    </section>
  );
};