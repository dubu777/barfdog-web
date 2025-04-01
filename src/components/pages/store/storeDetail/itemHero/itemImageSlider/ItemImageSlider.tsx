import * as styles from './ItemImageSlider.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { DetailItemImage } from "@/types";

const ItemImageSlider = ({ heroImageList }: { heroImageList: DetailItemImage[] }) => {
  return (
    <Swiper
      slidesPerView='auto'
      className={styles.heroImageList}
      pagination
      modules={[Pagination]}
    >
      {heroImageList?.map(image => (
        <SwiperSlide
          key={image.id}
          className={styles.imageSlideBox}
        >
          <Image
            src={image.url}
            alt={image.filename}
            width={560}
            height={560}
            className={styles.imageSlide}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ItemImageSlider;