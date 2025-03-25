'use client';
import React from "react";
import * as styles from "./MainCard.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import EmptyStateCard from "@/components/pages/mypage/common/cards/section/EmptyStateCard";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import { useGetSubscriptionList } from "@/api/subscription/queries/useGetSubscriptionList";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";

const MainCard = () => {
  const { data: subscriptionData } = useGetSubscriptionList(0, 100);
  const { data: petList } = useGetPetList();

  const subscribingList = subscriptionData?.filter(dog => dog.subscribeDto.status === 'SUBSCRIBING');
  const subscribingPets = petList?.filter(dog => dog.subscribeStatus === 'SUBSCRIBING');
  // const newSubscribingList = [...subscribingList];
  const newSubscribingList = [...subscribingPets];

  const emptyState = newSubscribingList.length < 1;

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
          {newSubscribingList.map((pet, index) => {
            return (
              pet &&
              <SwiperSlide
                key={`${pet.id}-${index}`}
                className={styles.itemSlider}
              >
                <SubscriptionCard data={pet} type='mypage' />
              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </article>
  );
};

export default MainCard;