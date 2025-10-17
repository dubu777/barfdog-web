import * as styles from "./ImageSlide.css";
import Chips from "@/components/common/chips/Chips";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ReviewImage } from "@/types";
import type { Swiper as SwiperType } from 'swiper/types';

interface ImageSlideProps {
	imageList: ReviewImage[];
	defaultImageIndex: number;
	showPadding?: boolean;
	onSwiperInit?: (swiper: SwiperType) => void;
	handleImageClick?: (index: number) => void;
}

export default function ImageSlide({
	imageList,
	defaultImageIndex = 0,
	showPadding = true,
	onSwiperInit,
	handleImageClick,
}: ImageSlideProps) {

	return (
		<div className={styles.imageList({ showPadding })}>
			<Swiper
				slidesPerView='auto'
				initialSlide={defaultImageIndex}
				onSwiper={(swiper) => onSwiperInit?.(swiper)}
			>
				{imageList.map((reviewImage, index) => (
					<SwiperSlide
						key={reviewImage.displayImageUrl.url}
						className={styles.imageSlider}
						onClick={handleImageClick ? () => handleImageClick(index) : undefined}
					>
						<Chips
							variant='solid' 
							color='red' 
							borderRadius='lg' 
							size='lg' 
							className={styles.imageCountChip}
						>
							{index+1}/{imageList.length}
						</Chips>
						<Image 
							src={reviewImage.displayImageUrl.url} 
							alt={`review-image-${index}`} 
							width={1200}
							height={1200} 
							className={styles.image}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};