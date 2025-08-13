import * as styles from './ItemImageSlider.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DetailItemImage } from "@/types";
import SlideCounter from '@/components/common/slideCounter/SlideCounter';
import { useState } from 'react';

export default function ItemImageSlider({ 
  itemImageList
}: { itemImageList: DetailItemImage[] }) {
    const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <Swiper
      slidesPerView='auto'
      className={styles.itemImageList}
      onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
    >
      {itemImageList.length > 1 &&
        <div className={styles.imageCount}>
          <SlideCounter currentSlide={currentSlide} totalSlides={itemImageList.length} />
        </div>
      }
      {itemImageList?.map(image => (
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