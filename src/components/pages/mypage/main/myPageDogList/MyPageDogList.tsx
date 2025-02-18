'use client';
import { useRef } from "react";
import * as styles from "./MyPageDogList.css";
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import DogCard from "@/components/pages/mypage/main/myPageDogList/dogCard/DogCard";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";

const MyPageDogList = () => {
  const { data: dogList } = useGetDogList();

  const representativeDog = dogList?.find(dog => dog.representative);
  const subscribingDogs = dogList?.filter(dog => dog.nextDeliveryDate && dog.subscribeStatus === 'SUBSCRIBING');
  const newDogList = [
    ...subscribingDogs, 
    representativeDog, 
    ...dogList
      .filter(dog =>
        !dog.representative
        && !(dog.nextDeliveryDate && dog.subscribeStatus === 'SUBSCRIBING')
      )
  ];

  const noData = dogList.length < 1;

  const swiperRef = useRef<SwiperRef | null>(null);
  const resetSwiper = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance) {
        swiperInstance.slideTo(1);
      }
    }
  }

  return (
    <article className={styles.dogInfoBox}>
      {noData ?
        <DogCard noData={true} resetSwiper={undefined} />
        : <Swiper
          ref={swiperRef}
          slidesPerView='auto'
          centeredSlides={true}
          spaceBetween={18}
          scrollbar={{
            hide: false,
            draggable: true,
            el: `.${styles.dogListScrollbar}`,
          }}
          modules={[Scrollbar]}
          className={styles.dogList}
        >
          {newDogList.map((dog, index) => (
            dog && 
              <SwiperSlide
                key={`${dog.id}-${index}`}
                className={styles.dogSlider}
              >
                <DogCard dog={dog} noData={false} resetSwiper={resetSwiper} />
              </SwiperSlide>
          ))}
          <div className={styles.dogListScrollbar} />
        </Swiper>
      }
    </article>
  );
};

export default MyPageDogList;