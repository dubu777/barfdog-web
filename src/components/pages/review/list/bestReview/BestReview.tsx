import { commonWrapper, ellipsis, imageWrapper } from "@/styles/common.css";
import { bestReviewBanner, bestReviewBannerStar, bestReviewBox, bestReviewCard, bestReviewSlide } from './BestReview.css';
import { useState } from "react";
import { motion, Transition } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import UserIcon from '/public/images/mypage/user-profile.svg';
import CameraIcon from '/public/images/icons/camera.svg';
import BannerStarIcon from '/public/images/icons/banner_star.svg';
import Image from "next/image";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import RateStar from "@/components/ui/rateStar/RateStar";
import BestReviewModal from "@/components/pages/review/list/bestReview/bestReviewModal/BestReviewModal";
import useModal from "@/hooks/useModal";
import { BestReviewItem } from "@/types";
import { useGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";

const motionTransition = {
  duration: 2,
  repeat: Infinity,
  repeatType: 'loop',
  ease: 'easeInOut',
} as Transition;

export default function BestReview() {
  const [selectedReview, setSelectedReview] = useState<BestReviewItem | null>(null);
  const { data: bestReviewList } = useGetBestReviewList();

  const [isHover, setIsHover] = useState<boolean>(false);
  const { onToggle, onClose, isOpen } = useModal();

  const handleSelectReview = async (review: BestReviewItem) => {
    setSelectedReview(review);
    onToggle();
  }

  const handleCloseReview = () => {
    setSelectedReview(null);
    onClose();
  }

  if (!bestReviewList) return null;
  return (
    <article>
      <div className={commonWrapper({ 
        direction: 'col',
        align: 'start',
        padding: 20, 
        paddingTop: 40 
      })}>
        <Text type='title2'>바프독 견주님들의<br/>생생한 후기를 확인하세요</Text>
        <Text type='body2' color='gray600'>명예의 바프독 BEST 리뷰 모음!</Text>
      </div>
      <Swiper
        slidesPerView='auto'
        centeredSlides={true}
        spaceBetween={8}
        className={bestReviewBox}
      >
        {bestReviewList.map(review => (
          <SwiperSlide
            key={review.reviewId}
            className={bestReviewSlide}
          >
            <Card shadow='normal' padding={12}>
              <div onClick={() => handleSelectReview(review)} className={bestReviewCard}>
                <Image
                  src={review.reviewImageList[0].displayImageUrl.url}
                  alt={(review.titleByAdmin ? review.titleByAdmin : review.reviewer) || ''}
                  width={200}
                  height={200}
                  className={imageWrapper({  width: 107, objectFit: 'cover', borderRadius: 8 })}
                />
                <div className={commonWrapper({ 
                  direction: 'col', 
                  align: 'start', 
                  justify: 'start', 
                  gap: 8,
                })}>
                  <div className={commonWrapper({ justify: 'between' })}>
                    <div className={commonWrapper({ justify: 'start', gap: 4 })}>
                      <SvgIcon src={UserIcon} size={19} />
                      <Text type='caption' color='gray900'>
                        {review.reviewer ? review.reviewer.split('@')[0] : ''}
                      </Text>
                    </div>
                    <RateStar rateLength={5} value={5} size={12.8} />
                  </div>
                  <Text type='body3' color='gray700' className={ellipsis({ lineSize: 'line4' })}>
                    {review.contents}
                  </Text>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={bestReviewBanner}
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
          className={bestReviewBannerStar({ xPosition: 'left' })}
        >
          <SvgIcon src={BannerStarIcon} size={17.45} color={isHover ? 'red' : 'pastelRed'} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, .8, 1], rotate: [0, 10, 0] }}
          transition={motionTransition}
          className={bestReviewBannerStar({ xPosition: 'right' })}
        >
          <SvgIcon src={BannerStarIcon} size={17.45} color={isHover ? 'red' : 'pastelRed'} />
        </motion.div>
        <Text type='body2' color={isHover ? 'red' : 'gray0'} style={{ transition: 'all .35s' }}>
          리뷰 작성하고 BEST 리뷰가 되어보세요!
        </Text>
      </div>
      {selectedReview &&
        <BestReviewModal 
          isOpen={isOpen} 
          onClose={handleCloseReview} 
          reviewItem={selectedReview} 
        />
      }
    </article>
  );
};