'use client';

import React from 'react';
import Image from "next/image";
import * as styles from './slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SurveyImageSlider = ({ images }: { images: string[] }) => {
  return (
    <div className={styles.mainSliderWrapper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mainSliderContainer}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img}>
            <Image src={img} alt={`image${index}`} width={280} height={320} style={{ objectFit: 'contain' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SurveyImageSlider;