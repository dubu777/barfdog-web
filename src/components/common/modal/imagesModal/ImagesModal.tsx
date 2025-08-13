import { useState } from "react";
import Image from "next/image";
import * as styles from './ImagesModal.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CloseIcon from "/public/images/header/close.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ModalBackground from "@/components/common/modalBackground/ModalBackground";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Header from "@/components/layout/header/Header";
import { ImageFile, UploadedFile } from "@/types";

// 건강수첩 부분으로부터 UploadedFile type 형식이 바뀜
// 현재 다른 곳 ImageFile type 으로 사용중임에 따라 임시로 처리
// 추후 UploadedFile로 변경 필요

export interface ImagesModalProps {
	imageList: ImageFile[] | UploadedFile[]
	isOpen: boolean;
	onClose: () => void;
	defaultImageIndex: number;
}

export default function ImagesModal ({
	imageList,
	isOpen,
	onClose,
	defaultImageIndex = 0
}: ImagesModalProps) {
	const [activeIndex, setActiveIndex] = useState<number>(defaultImageIndex);

	if(imageList?.length === 0) return null;
	return (
		<ModalBackground
			isVisible={isOpen}
			onClose={onClose}
			isDimmed={false}
			closeOnBackgroundClick={false}
		>
			<div className={styles.imagesModalContainer}>
				<Header
					leftElement={(
						<DefaultText type='headline3' color='white'>
							{activeIndex+1} / {imageList.length}
						</DefaultText>
					)}
					rightElement={(
						<button onClick={onClose}>
							<SvgIcon src={CloseIcon} size={24} color='white' />
						</button>
					)}
					backgroundColor='gray900'
				/>
				<Swiper
					initialSlide={defaultImageIndex}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					className={styles.imageSliderWrapper}
				>
					{imageList?.map(image => (
						<SwiperSlide
							key={image.fileName}
							className={styles.imageSlider}
						>
							<Image src={image.displayImageUrl?.url ?? ''} alt={image.fileName} sizes="350px" fill style={{ objectFit: 'contain' }} className={styles.image} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</ModalBackground>
	);
};