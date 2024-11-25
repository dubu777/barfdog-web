import * as styles from "./DogList.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import DogCard from "@/components/pages/mypage/main/DogList/DogCard";
import { DogData } from "@/types/myPage";

const DogList = ({ dogsData }: { dogsData: DogData[] }) => {
  const representativeDog = dogsData.find(dog => dog.representative);
  const subscribingDogs = dogsData.filter(dog => dog.nextDeliveryDate && dog.subscribeStatus === 'SUBSCRIBING');
  const newDogsData = [...subscribingDogs, representativeDog, ...dogsData.filter(dog => !dog.representative || (!dog.nextDeliveryDate && dog.subscribeStatus !== 'SUBSCRIBING'))];
  const noData = newDogsData.length < 1;
  return (
    <article className={styles.dogsInfoBox}>
      {noData ?
        <DogCard noData={true} />
        : <Swiper
          slidesPerView='auto'
          centeredSlides={true}
          spaceBetween={18}
          scrollbar={{
            hide: false,
            draggable: true,
            el: `.${styles.dogListScrollbar}`,
          }}
          modules={[Scrollbar]}
          className={styles.dogsList}
        >
          {newDogsData.map((dog, index) => (
            <SwiperSlide
              key={`${dog.id}-${index}`}
              className={styles.dogSlider}
            >
              <DogCard dog={dog} noData={false} />
            </SwiperSlide>
          ))}
          <div className={styles.dogListScrollbar} />
        </Swiper>
      }
    </article>
  );
};

export default DogList;