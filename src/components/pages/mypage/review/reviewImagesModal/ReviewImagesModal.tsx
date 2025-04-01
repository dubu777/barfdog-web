import * as styles from './ReviewImagesModal.css';
import Image from "next/image";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGetReviewDetailImageList } from "@/api/review/queries/useGetReviewDetailImageList";

interface ReviewImagesModalProps {
	reviewId: number;
	isOpen: boolean;
	onClose: () => void;
}

const ReviewImagesModal = ({ reviewId, isOpen, onClose }: ReviewImagesModalProps) => {
	const { data: reviewImageList } = useGetReviewDetailImageList(reviewId);
	if(reviewImageList?.length === 0) return null;
	return (
		reviewId &&
		<DefaultModal
			isVisible={isOpen}
			onClose={onClose}
			type="info"
			size="lg"
		>
			<Swiper
				pagination
				navigation
				modules={[Navigation]}
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

		</DefaultModal>
	);
};

export default ReviewImagesModal;