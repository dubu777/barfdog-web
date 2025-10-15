import { useState } from "react";
import * as styles from './ReviewItem.css';
import { ellipsis } from "@/styles/common.css";
import PictureIcon from '/public/images/icons/picture.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import ImagesModal from "@/components/common/modal/imagesModal/ImagesModal";
import ReviewInfoTop from "@/components/pages/review/common/reviewItem/ReviewInfoTop";
import useModal from "@/hooks/useModal";
import { useGetReviewImageList } from "@/api/review/queries/useGetReviewImageList";

interface ReviewItemProps {
	reviewId: number;
	username: string;
	contents: string;
	star: number;
	writtenDate: string;
	isExpanded?: boolean;           // isExpanded (아코디언이 펼침 여부)
	hasReviewImages?: boolean;
	backgroundColor?: 'gray50' | 'white';
	onToggle?: () => void;          // onToggle (토글 핸들러)
}

export default function ReviewItem({
	reviewId,
	username,
	contents,
	star,
	writtenDate,
	isExpanded = true,
	hasReviewImages = false,
	backgroundColor = 'white',
	onToggle,
}: ReviewItemProps) {
	const { isOpen, onClose, onToggle: onToggleModal } = useModal();
	const [defaultImageIndex, setDefaultImageIndex] = useState<number>(0);

	const { data } = useGetReviewImageList(reviewId, {
		enabled: isExpanded && hasReviewImages,
		staleTime: 1000 * 60 * 5,  // 5분 동안 신선
		gcTime: 1000 * 60 * 10,    // 10분 동안 캐시 유지 (v5라면 gcTime)
	});

	const reviewImageList = data?.reviewImageList.map(image => ({ ...image, fileName: '' })) || [];

	const handleThumbnailClick = (index) => {
		onToggleModal();
		setDefaultImageIndex(index);
	}

	const handleCloseModal = () => {
		onClose();
		setDefaultImageIndex(0);
	}
	return (
		<>
			<div className={styles.contentBox({ background: backgroundColor, isExpanded })}>
				<ReviewInfoTop
					username={username}
					star={star}
					writtenDate={writtenDate}
					onToggle={onToggle}
					isExpanded={isExpanded}
				/>
				{isExpanded &&
					<Divider thickness={1} color='gray200' direction='horizontal' />
				}
				<div className={styles.contentBottom}>
					{isExpanded && reviewImageList.length > 0 &&
						<ImageCarousel
							imageList={reviewImageList}
							handleThumbnailClick={handleThumbnailClick}
							width={100}
							height={100}
						/>
					}
					<div className={styles.contents} onClick={!isExpanded ? onToggle : undefined}>
						{!isExpanded && hasReviewImages && <SvgIcon src={PictureIcon} size={24} />}
						<Text type='body2' className={!isExpanded ? ellipsis({ lineSize: 'line1' }) : ''}>
							{contents}
						</Text>
					</div>
				</div>
			</div>
			{isOpen &&
				<ImagesModal
					isOpen={isOpen}
					onClose={handleCloseModal}
					defaultImageIndex={defaultImageIndex}
					imageList={reviewImageList}
				/>
			}
		</>
	);
};