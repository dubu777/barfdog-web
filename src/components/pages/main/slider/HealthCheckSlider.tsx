'use client';

import React from 'react';
import Image from "next/image";
import * as mainStyles from "@/components/pages/main/main.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CheckWhite from '/public/images/icons/check-white.svg';
import { useSelectedHealthStore } from "@/store/mainStore";
import { HealthCheckList } from "@/constants/mainData";

const HealthCheckSlider = () => {
  const { selectedHealth, setSelectedHealth } = useSelectedHealthStore();

  const handleSelectHealth = (key) => {
    setSelectedHealth({
      key: key,
      isChecked: true
    })
  }
  return (
    <Swiper
      slidesPerView='auto'
      spaceBetween={18}
      className={mainStyles.recommendSlideList()}
    >
      {HealthCheckList.map(health => (
        <SwiperSlide
          key={health.key}
          className={mainStyles.recommendSlideBox({ type: 'healthCheck' })}
        >
          <div
            className={mainStyles.recommendSlideItem}
            onClick={() => handleSelectHealth(health.key)}
          >
            <h3
              className={`${mainStyles.healthCheckTitle} ${mainStyles.mainTitle({ size: 'md', color: 'white' })}`}
            >
              {health.name}
            </h3>
            <Image
              src={health.imageUrl}
              alt={`${health.key} image`}
              width={139}
              height={182}
              priority={false}
              className={mainStyles.recommendSlideImage({ type: 'healthCheck' })}
            />
          </div>
          {selectedHealth.key === health.key && selectedHealth.isChecked &&
          <div className={mainStyles.healthCheckFakeBg}>
            <CheckWhite />
          </div>
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HealthCheckSlider;