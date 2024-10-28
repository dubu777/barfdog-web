'use client';

import * as styles from './slider.css';
import * as mainStyles from '../main.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ReviewDataProps } from "@/components/pages/main/MainReview";
import { ellipsis } from "@/styles/common.css";

const ReviewCardSlider = ({ reviewData }: { reviewData: ReviewDataProps[] }) => {
  const rate = 5;
  return (
    <div className={styles.mainSliderWrapper}>
      <Swiper
        slidesPerView='auto'
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {reviewData.map((item) => (
          <SwiperSlide
            key={item.id}
            className={styles.reviewSlideItem}
          >
            <div className={styles.reviewSlideContents}>
              <h3
                className={`${mainStyles.mainTitle({ size: 'md' })} ${styles.reviewSlideTitle}`}>
                {item.titleByAdmin}
              </h3>
              <p className={`${ellipsis({ lineSize: 'line3', whiteSpace: 'pre' })} ${mainStyles.mainDescription({ size: 'xs', color: 'black', align: 'left', weight: 'light' })}`}>
                {item.contents}
              </p>
            </div>
            <p className={styles.reviewRate}>
              {Array.from({length: rate}, (v, i) => i + 1).map((_, i) => (
                <>★</>
              ))}
            </p>
            <Image
              src={item.imageUrl}
              alt='card image'
              width={311}
              height={227}
              className={styles.reviewSlideImage}
              priority={false}
            />
            <div className={styles.reviewSlideBottomInfo}>
              <p>
                {item.username.includes('@')
                  ? item.username.split('@')[0].trim()
                  : item.username}{' '}
                보호자님
              </p>
              <p className={styles.reviewSlideSubscribeType}>
                {item.orderType === 'subscribe' ? '정기구독' : '일반구매' }
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCardSlider;