import { useState } from "react";
import { contentBox } from "@/components/pages/review/common/ReviewCommonStyle.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper/types';
import { useGetBestReviewDetail } from "@/api/review/queries/useGetBestReviewDetail";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import ImageSlide from "@/components/common/imageSlide/ImageSlide";
import useModal from "@/hooks/useModal";
import ImagesModal from "@/components/common/modal/imagesModal/ImagesModal";
import ReviewInfoTop from "@/components/pages/review/common/ReviewInfoTop";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";

interface BestReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: number;
}

const BestReviewModal = ({ isOpen, onClose, reviewId }: BestReviewModalProps) => {
  const { data: reviewDetail } = useGetBestReviewDetail(reviewId);
  const review = reviewDetail.reviewDto;
  const reviewImageList = reviewDetail.reviewImageDtoList;

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { isOpen: isOpenImageDetail, onClose: onCloseImageDetail, onToggle: onToggleImageDetail } = useModal();

  const [defaultImageIndex, setDefaultImageIndex] = useState<number>(0);

  const handleThumbnailClick = (index) => {
    swiperInstance?.slideTo(index);
    setDefaultImageIndex(index);
  }

  const handleImageClick = (index) => {
    onToggleImageDetail();
    setDefaultImageIndex(index)
  }

  return (
    <FullModalWrapper
      isVisible={isOpen}
      handleClose={onClose}
      headerTitle='베스트 리뷰'
    >
      <div className={contentBox({ background: 'white' })}>
        <ReviewInfoTop
          username={review.username}
          star={review.star}
          writtenDate={review.writtenDate}
        />
      </div>
      <Divider thickness={4} color='gray50' />
      <div className={contentBox({ background: 'white' })}>
        <ImageSlide
          imageList={reviewImageList}
          defaultImageIndex={defaultImageIndex}
          showPadding={false}
          onSwiperInit={setSwiperInstance}
          handleImageClick={handleImageClick}
        />
        <ImageCarousel
          imageList={reviewImageList}
          handleThumbnailClick={handleThumbnailClick}
          width={72}
          height={72}
        />
      </div>
      <Divider thickness={4} color='gray50' />
      <div className={contentBox({ background: 'white' })}>
        <Text type='body2'>{review.contents}</Text>
      </div>
      <ButtonDocked
        type='full-button'
        primaryButtonLabel='리뷰 닫기'
        onPrimaryClick={onClose}
        primaryButtonVariant='outline'
      />
      {isOpenImageDetail &&
        <ImagesModal
          isOpen={isOpenImageDetail}
          onClose={onCloseImageDetail}
          defaultImageIndex={defaultImageIndex}
          imageList={reviewImageList}
        />
      }
    </FullModalWrapper>
  );
};

export default BestReviewModal;