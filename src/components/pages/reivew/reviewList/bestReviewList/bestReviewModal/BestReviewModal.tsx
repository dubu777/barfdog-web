import * as styles from './BestReviewModal.css';
import Image from "next/image";
import Text from "@/components/common/text/Text";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import RateStar from "@/components/common/rateStar/RateStar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGetBestReviewDetail } from "@/api/review/queries/useGetBestReviewDetail";

interface BestReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: number;
}

const BestReviewModal = ({ isOpen, onClose, reviewId }: BestReviewModalProps) => {
  const { data: reviewDetail } = useGetBestReviewDetail(reviewId);
  const review = reviewDetail.reviewDto;
  const reviewImageList = reviewDetail.reviewImageDtoList;
  return (
    <DefaultModal
      isVisible={isOpen}
      onClose={onClose}
      type="info"
      size="lg"
    >
      <div className={styles.bestReviewModalContainer}>
        <Text type='description' size='sm' color='grey' align='left'>{review.writtenDate}</Text>
        <div className={styles.reviewTitleWithRate}>
          <strong>{review.titleByAdmin}</strong>
          <RateStar rateLength={review.star} />
        </div>
        {reviewImageList.length > 0 &&
        <Swiper
          pagination
          navigation
          modules={[Pagination, Navigation]}
          className={styles.reviewImageSlider}
        >
          {reviewImageList.map(reviewImage => (
            <SwiperSlide
              key={reviewImage.filename}
            >
              <Image src={reviewImage.url} alt={reviewImage.filename} width={373} height={336} />
            </SwiperSlide>
          ))}
        </Swiper>
        }
        <Text type='description' size='sm' color='black' align='left'>{review.contents}</Text>
        <div className={styles.reviewUsername}>
          <Text type='description' size='sm' color='grey'>{review.username}</Text>
          <Text type='description' size='sm' color='grey'>{review.orderType === 'item' ? '일반구매': '정기구독'}</Text>
        </div>
      </div>
    </DefaultModal>
  );
};

export default BestReviewModal;