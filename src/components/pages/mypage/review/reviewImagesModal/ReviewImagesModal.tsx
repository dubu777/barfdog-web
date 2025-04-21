import { useState } from "react";
import * as styles from './ReviewImagesModal.css';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ModalBackground from "@/components/common/modalBackground/ModalBackground";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CloseIcon from "/public/images/header/close.svg";
import { ReviewImage } from "@/types";

interface ReviewImagesModalProps {
	isOpen: boolean;
	onClose: () => void;
	defaultImageIndex: number;
	reviewImageList: ReviewImage[]
}

const ReviewImagesModal = ({
	reviewImageList,
	isOpen,
	onClose,
	defaultImageIndex = 0
}: ReviewImagesModalProps) => {
	const [activeIndex, setActiveIndex] = useState<number>(defaultImageIndex);

	if(reviewImageList?.length === 0) return null;
	return (
		<ModalBackground
			isVisible={isOpen}
			onClose={onClose}
		>
			<div className={styles.reviewImagesModalContainer}>
				<div className={styles.reviewImageModalHeader}>
					<DefaultText type='headline3' color='white'>
						{activeIndex+1}/{reviewImageList.length}
					</DefaultText>
					<button onClick={onClose}>
						<SvgIcon src={CloseIcon} size={24} color='white' />
					</button>
				</div>
				<Swiper
					initialSlide={defaultImageIndex}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				>
					{reviewImageList?.map(reviewImage => (
						<SwiperSlide
							key={reviewImage.filename}
							className={styles.reviewImageSlider}
						>
							<Image src={reviewImage.url} alt={reviewImage.filename} sizes="350px" fill style={{ objectFit: 'contain'}} className={styles.reviewImage} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</ModalBackground>
	);
};

export default ReviewImagesModal;