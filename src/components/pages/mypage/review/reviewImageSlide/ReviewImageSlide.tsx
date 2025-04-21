import * as styles from "@/components/pages/mypage/review/reviewDetail/ReviewDetail.css";
import Chips from "@/components/common/chips/Chips";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ReviewImage } from "@/types";

interface ReviewImageSlideProps {
	reviewImageList: ReviewImage[];
	defaultImageIndex: number;
}

const ReviewImageSlide = ({
	reviewImageList,
	defaultImageIndex = 0,
}: ReviewImageSlideProps) => {
	return (
		<article className={styles.reviewDetailImageList}>
			<Swiper
				slidesPerView='auto'
				initialSlide={defaultImageIndex}
			>
				{reviewImageList.map((reviewImage, index) => (
					<SwiperSlide
						key={reviewImage.filename}
						className={styles.reviewImageSlider}
					>
						<Chips variant='solid' color='red' borderRadius='lg' size='lg' className={styles.reviewImageCountChip}>
							{index+1}/{reviewImageList.length}
						</Chips>
						<Image src={reviewImage.url} alt={reviewImage.filename} sizes="335px" fill className={styles.reviewImage} />
					</SwiperSlide>
				))}
			</Swiper>
		</article>
	);
};

export default ReviewImageSlide;