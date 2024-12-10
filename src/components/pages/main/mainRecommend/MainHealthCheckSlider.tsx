import Image from "next/image";
import * as styles from "./MainRecommend.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CheckWhite from '/public/images/icons/check-white.svg';
import { useMainStore } from "@/store/useMainStore";
import { HealthCheckList } from "@/constants";
import MainText from "@/components/pages/main/mainText/MainText";

const MainHealthCheckSlider = () => {
  const { selectedHealth, setSelectedHealth } = useMainStore();

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
      className={styles.recommendSlideList()}
    >
      {HealthCheckList.map(health => (
        <SwiperSlide
          key={health.key}
          className={styles.recommendSlideBox({ type: 'healthCheck' })}
        >
          <div
            className={styles.recommendSlideItem}
            onClick={() => handleSelectHealth(health.key)}
          >
            <MainText className={styles.healthCheckTitle} type='title' size='md' color='white'>
              {health.name}
            </MainText>
            <Image
              src={health.imgUrl}
              alt={`${health.key} image`}
              width={139}
              height={182}
              priority={false}
              className={styles.recommendSlideImage({ type: 'healthCheck' })}
            />
          </div>
          {selectedHealth.key === health.key && selectedHealth.isChecked &&
          <div className={styles.healthCheckFakeBg}>
            <CheckWhite />
          </div>
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainHealthCheckSlider;