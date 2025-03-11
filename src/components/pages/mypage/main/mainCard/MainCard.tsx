'use client';
import React from "react";
import * as styles from "./MainCard.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import EmptyStateCard from "@/components/pages/mypage/layout/cards/emptyStateCard/EmptyStateCard";
import MyPageCard from "@/components/pages/mypage/layout/cards/myPageCard/MyPageCard";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";

const MainCard = () => {
  const { data: petList } = useGetPetList();
  const subscribingPets = petList?.filter(dog => dog.subscribeStatus === 'SUBSCRIBING');
  const newPetList = [...subscribingPets];
  const emptyState = newPetList.length < 1;

  return (
    <article className={styles.dogInfoContainer({ emptyState })}>
      {emptyState ?
        <EmptyStateCard type='default' />
        :
        <Swiper
          slidesPerView='auto'
          centeredSlides={true}
          spaceBetween={8}
          pagination
          modules={[Pagination]}
          className={styles.petList}
        >
          {newPetList.map((pet, index) => {
            return (
              pet &&
              <SwiperSlide
                key={`${pet.id}-${index}`}
                className={styles.itemSlider}
              >
                <MyPageCard data={pet} type='mypage' />
              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </article>
  );
};

export default MainCard;