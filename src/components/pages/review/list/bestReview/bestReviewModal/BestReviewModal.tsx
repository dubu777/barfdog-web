import { useState } from "react";
import {
  bestReviewModalContainer,
  contentBox,
} from "@/components/domain/review/reviewItem/ReviewItem.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper/types";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import ImageCarousel from "@/components/ui/imageCarousel/ImageCarousel";
import ImageSlide from "@/components/pages/review/list/bestReview/bestReviewModal/imageSlide/ImageSlide";
import useModal from "@/hooks/useModal";
import ImagesModal from "@/components/ui/modal/imagesModal/ImagesModal";
import ReviewInfoTop from "@/components/domain/review/reviewItem/ReviewInfoTop";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";
import { BestReviewItem } from "@/types";

interface BestReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewItem: BestReviewItem;
}

export default function BestReviewModal({
  isOpen,
  onClose,
  reviewItem,
}: BestReviewModalProps) {
  const reviewImageList = reviewItem.reviewImageList;

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const {
    isOpen: isOpenImageDetail,
    onClose: onCloseImageDetail,
    onToggle: onToggleImageDetail,
  } = useModal();

  const [defaultImageIndex, setDefaultImageIndex] = useState<number>(0);

  const handleThumbnailClick = (index) => {
    swiperInstance?.slideTo(index);
    setDefaultImageIndex(index);
  };

  const handleImageClick = (index) => {
    onToggleImageDetail();
    setDefaultImageIndex(index);
  };

  return (
    <>
      <FullModalWrapper
        isVisible={isOpen}
        handleClose={onClose}
        headerTitle="리뷰상세"
        className={bestReviewModalContainer}
      >
        <div className={contentBox({ background: "white" })}>
          <ReviewInfoTop
            reviewer={reviewItem.reviewer}
            star={5}
            writtenDate={reviewItem.writtenDate ?? ""}
          />
        </div>
        <Divider height={4} color="gray50" />
        <div className={contentBox({ background: "white" })}>
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
            showRepresentativeLabel
          />
        </div>
        <Divider height={4} color="gray50" />
        <div className={contentBox({ background: "white" })}>
          <Text type="body2">{reviewItem.contents}</Text>
        </div>
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="리뷰 닫기"
          onPrimaryClick={onClose}
          primaryButtonVariant="outline"
        />
      </FullModalWrapper>
      {isOpenImageDetail && (
        <ImagesModal
          isOpen={isOpenImageDetail}
          onClose={onCloseImageDetail}
          defaultImageIndex={defaultImageIndex}
          imageList={reviewImageList}
        />
      )}
    </>
  );
}
