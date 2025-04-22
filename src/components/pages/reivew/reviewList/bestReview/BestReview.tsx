'use client';
import { useState } from "react";
import { ellipsis } from "@/styles/common.css";
import * as styles from './BestReview.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Text from "@/components/common/text/Text";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetBestReviewDetail } from "@/api/review/queries/useGetBestReviewDetail";
import { useGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";
import BestReviewModal from "@/components/pages/reivew/reviewList/bestReview/bestReviewModal/BestReviewModal";
import RateStar from "@/components/common/rateStar/RateStar";
import DefaultText from "@/components/common/defaultText/DefaultText";

const BestReview = () => {
  const [reviewId, setReviewId] = useState<number | null>(null);
  const { data: bestReviewList } = useGetBestReviewList();
  const { onToggle, onClose, isOpen } = useModal();
  const rate = 5;

  const queryClient = useQueryClient();

  const handleSelectReview = async (reviewId: number) => {
    await prefetchGetBestReviewDetail(queryClient, reviewId)
    setReviewId(reviewId);
    onToggle();
  }
  return (
    <article>
      <div>
        <DefaultText type='title4'>바프독 견주님들의<br/>생생한 후기를 확인하세요</DefaultText>
        <DefaultText type='label4' color='gray600'>명예의 바프독 BEST 리뷰 모음!</DefaultText>
      </div>
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
              <Image src={review.imageUrl} alt={review.titleByAdmin ? review.titleByAdmin : review.username ? review.username : ''} width={240} height={240} className={styles.bestReviewImage} />
              <div className={styles.bestReviewInfo}>
                <div className={styles.bestReviewTop}>
                  <RateStar rateLength={rate} />
                  <Text type='description' size='xs' color='grey' align='center'>
                    {review.orderType === 'item' ? '일반구매': '정기구독'}
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

export default BestReview;