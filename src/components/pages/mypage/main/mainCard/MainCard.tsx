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
// import { useGetDogList } from "@/api/dog/queries/useGetDogList";

const MainCard = () => {
  const { data: subscriptionData } = useGetSubscriptionList(0, 999);
  // const { data: dogList } = useGetDogList();

  const subscribingList =
    subscriptionData?.filter(
      subscription => subscription.subscribeDto.status === 'SUBSCRIBING')
      .map(subscription => ({
        ...subscription.subscribeDto, recipeNames: subscription.recipeNames
      })
    );
  // const subscribingPets = dogList?.filter(dog => dog.subscribeStatus === 'SUBSCRIBING');
  // const newSubscribingList = [];
  const newSubscribingList = [...subscribingList];

  const emptyState = newSubscribingList.length < 1;

  console.log('subscribingList', subscribingList)

  return (
    <article className={styles.dogInfoContainer({ emptyState })}>
      {emptyState ?
        <EmptyStateCard type='default' />
        : <Swiper
          slidesPerView='auto'
          centeredSlides={true}
          spaceBetween={8}
          pagination
          modules={[Pagination]}
          className={styles.dogList}
        >
          {newSubscribingList.map((subscription, index) => {
            return (
              subscription &&
              <SwiperSlide
                key={`${subscription.subscribeId}-${index}`}
                className={styles.itemSlider}
              >
                <SubscriptionCard data={subscription} type='mypage' subscriptionId={subscription.subscribeId} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </article>
  );
};

export default MainCard;