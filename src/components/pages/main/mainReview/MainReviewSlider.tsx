import * as styles from './MainReview.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MainText from "@/components/pages/main/mainText/MainText";
import { ellipsis } from "@/styles/common.css";
import { Fragment } from "react";
import { MainBestReviewsDto } from "@/types";

const MainReviewSlider = ({ reviewData }: { reviewData: MainBestReviewsDto[] }) => {
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
              <MainText className={styles.reviewSlideTitle} type='title' size='md'>
                {item.titleByAdmin}
              </MainText>
              <MainText
                type='description'
                size='xs'
                color='black'
                align='left'
                weight='light'
                className={ellipsis({ lineSize: 'line3', whiteSpace: 'pre' })}
              >
                {item.contents}
              </MainText>
            </div>
            <p className={styles.reviewRate}>
              {Array.from({length: rate}, (v, i) => i + 1).map((_, i) => (
                <Fragment key={i}>★</Fragment>
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

export default MainReviewSlider;