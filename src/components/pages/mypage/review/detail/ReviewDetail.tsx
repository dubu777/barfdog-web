'use client';
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/ui/text/Text";
import ImageCarousel from "@/components/ui/imageCarousel/ImageCarousel";
import Divider from "@/components/ui/divider/Divider";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import ReviewCard from "@/components/pages/mypage/review/common/reviewCard/ReviewCard";
import ImagesModal from "@/components/ui/modal/imagesModal/ImagesModal";
import UpdateReviewModal from "@/components/pages/mypage/review/update/UpdateReviewModal";
import useModal from "@/hooks/useModal";
import { useImageModal } from "@/hooks/useImageModal";
import { ReviewItemType } from "@/types";
import { useGetReviewDetail } from "@/api/mypage/review/queries/useGetReviewDetail";

interface ReviewDetailProps {
  reviewId: number;
  reviewType: ReviewItemType;
}

export default function ReviewDetail({
  reviewId,
  reviewType,
}: ReviewDetailProps) {
  const { data } = useGetReviewDetail(reviewId, reviewType);

  const reviewInfo = data.reviewInfo;
  const reviewImageList = data.reviewImageList;
  const reviewStatus = data.reviewInfo.status;

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
                    <Text type='label4' color='pastelRed'>
                      리뷰가 반려됐어요. 수정 시 해당 리뷰는 승인대기 상태로 변경되고 승인되면 적립금이 지급돼요.
                    </Text>
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
        displayItemThumbnailUrl={reviewInfo?.displayItemThumbnailUrl?.url}
        status={reviewStatus}
        writtenDate={reviewInfo?.writtenDate}
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