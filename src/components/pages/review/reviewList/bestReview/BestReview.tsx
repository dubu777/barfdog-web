import { useState } from "react";
import * as styles from './BestReview.css';
import { ellipsis } from "@/styles/common.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import BestReviewModal from "@/components/pages/review/modal/bestReviewModal/BestReviewModal";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetBestReviewDetail } from "@/api/review/queries/useGetBestReviewDetail";
import { useGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import UserIcon from '/public/images/mypage/user-profile.svg';
import CameraIcon from '/public/images/icons/camera.svg';
import BannerStarIcon from '/public/images/icons/banner_star.svg';
import RateStar from "@/components/common/rateStar/RateStar";
import { motion, Transition } from 'framer-motion';

const motionTransition = {
  duration: 2,
  repeat: Infinity,
  repeatType: 'loop',
  ease: 'easeInOut',
} as Transition;

const BestReview = () => {
  const [reviewId, setReviewId] = useState<number | null>(null);
  const { data: bestReviewList } = useGetBestReviewList();

  const [isHover, setIsHover] = useState<boolean>(false);
  const { onToggle, onClose, isOpen } = useModal();

  const queryClient = useQueryClient();

  const handleSelectReview = async (reviewId: number) => {
    await prefetchGetBestReviewDetail(queryClient, reviewId)
    setReviewId(reviewId);
    onToggle();
  }

  const handleCloseReview = () => {
    setReviewId(null);
    onClose();
  }
  return (
    <article>
      <div className={styles.bestReviewTitle}>
        <DefaultText type='title2'>바프독 견주님들의<br/>생생한 후기를 확인하세요</DefaultText>
        <DefaultText type='body2' color='gray600'>명예의 바프독 BEST 리뷰 모음!</DefaultText>
      </div>
      <Swiper
        slidesPerView='auto'
        centeredSlides={true}
        spaceBetween={8}
        className={styles.bestReviewBox}
      >
        {bestReviewList.map(review => (
          <SwiperSlide
            key={review.id}
            className={styles.bestReviewSlide}
          >
            <Card shadow='normal' padding={12}>
              <div onClick={() => handleSelectReview(review.id)} className={styles.bestReviewCard}>
                <Image
                  src={review.imageUrl}
                  alt={(review.titleByAdmin ? review.titleByAdmin : review.username) || ''}
                  width={200}
                  height={200}
                  className={styles.bestReviewImage}
                />
                <div>
                  <div className={styles.bestReviewContentTop}>
                    <div className={styles.bestReviewUsername}>
                      <SvgIcon src={UserIcon} size={19} />
                      <DefaultText type='caption' color='gray900'>
                        {review.username ? review.username.split('@')[0] : ''}
                      </DefaultText>
                    </div>
                    <RateStar rateLength={5} value={5} size={12.8} />
                  </div>
                  <DefaultText type='body3' color='gray700' className={ellipsis({ lineSize: 'line4' })}>
                    {review.contents}
                  </DefaultText>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={styles.bestReviewBanner}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={motionTransition}
        >
          <SvgIcon src={CameraIcon} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={motionTransition}
          className={styles.bestReviewBannerStar({ xPosition: 'left' })}
        >
          <SvgIcon src={BannerStarIcon} size={17.45} color={isHover ? 'red' : 'pastelRed'} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, .8, 1], rotate: [0, 10, 0] }}
          transition={motionTransition}
          className={styles.bestReviewBannerStar({ xPosition: 'right' })}
        >
          <SvgIcon src={BannerStarIcon} size={17.45} color={isHover ? 'red' : 'pastelRed'} />
        </motion.div>
        <DefaultText type='body2' color={isHover ? 'red' : 'gray0'} style={{ transition: 'all .35s' }}>
          리뷰 작성하고 BEST 리뷰가 되어보세요!
        </DefaultText>
      </div>
      {reviewId &&
        <BestReviewModal isOpen={isOpen} onClose={handleCloseReview} reviewId={reviewId} />
      }
    </article>
  );
};

export default BestReview;