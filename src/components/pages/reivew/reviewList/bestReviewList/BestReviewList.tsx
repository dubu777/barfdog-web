'use client';
import { useState } from "react";
import { ellipsis } from "@/styles/common.css";
import * as styles from './BestReviewList.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Text from "@/components/common/text/Text";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetReviewDetail } from "@/api/review/queries/useGetReviewDetail";
import { useGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";
import BestReviewModal from "@/components/pages/reivew/reviewList/bestReviewList/bestReviewModal/BestReviewModal";
import RateStar from "@/components/common/rateStar/RateStar";

const BestReviewList = () => {
  const [reviewId, setReviewId] = useState<number | null>(null);
  const { data: bestReviewList } = useGetBestReviewList();
  const { onToggle, onClose, isOpen } = useModal();
  const rate = 5;

  const queryClient = useQueryClient();

  const handleSelectReview = async (reviewId: number) => {
    await prefetchGetReviewDetail(queryClient, reviewId)
    setReviewId(reviewId);
    onToggle();
  }
  return (
    <article>
      <Text type='title' size='titleLg'>BEST REVIEW</Text>
      <Swiper
        slidesPerView='auto'
        spaceBetween={18}
        scrollbar={{
          hide: false,
          draggable: true,
          el: `.${styles.bestReviewScrollbar}`,
        }}
        modules={[Scrollbar]}
        className={styles.bestReviewSlider}
      >
        {bestReviewList.map(review => (
          <SwiperSlide
            key={review.id}
            className={styles.bestReview}
          >
            <div onClick={() => handleSelectReview(review.id)}>
              <Image src={review.imageUrl} alt={review.titleByAdmin || review.username} width={240} height={240} className={styles.bestReviewImage} />
              <div className={styles.bestReviewInfo}>
                <div className={styles.bestReviewTop}>
                  <RateStar rateLength={rate} />
                  <Text type='description' size='xs' color='grey' align='center'>
                    {review.orderType === 'item' ? '일반구매': '정기구독'}품
                  </Text>
                </div>
                <Text type='description' size='sm' color='grey' align='left' className={ellipsis({ lineSize: 'line3' })}>
                  {review.contents}
                </Text>
                <Text type='description' size='sm' color='grey' align='center' className={styles.username}>
                  {review.username}
                </Text>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {reviewId &&
        <BestReviewModal isOpen={isOpen} onClose={onClose} reviewId={reviewId} />
      }
    </article>
  );
};

export default BestReviewList;