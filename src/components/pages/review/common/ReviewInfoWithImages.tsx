import { useState } from "react";
import * as styles from './ReviewCommonStyle.css';
import { ellipsis } from "@/styles/common.css";
import PictureIcon from '/public/images/icons/picture.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import ImagesModal from "@/components/common/modal/imagesModal/ImagesModal";
import ReviewInfoTop from "@/components/pages/review/common/ReviewInfoTop";
import useModal from "@/hooks/useModal";
import { ReviewImage } from "@/types";

interface ReviewInfoTopProps {
	username: string;
	contents: string;
	star: number;
	writtenDate: string;
	reviewImageList: ReviewImage[];
	showContents?: boolean;
	showPictureIcon?: boolean;
	backgroundColor?: 'gray50' | 'white';
	handleToggleReviewIds?: () => void;
}

const ReviewInfoWithImages = ({
	username,
	contents,
	star,
	writtenDate,
	showContents = true,
	reviewImageList = [],
	backgroundColor = 'white',
	handleToggleReviewIds,
}: ReviewInfoTopProps) => {
	const { isOpen, onClose, onToggle } = useModal();
	const [defaultImageIndex, setDefaultImageIndex] = useState<number>(0);

	const handleThumbnailClick = (index) => {
		onToggle();
		setDefaultImageIndex(index);
	}

	const handleCloseModal = () => {
		onClose();
		setDefaultImageIndex(0);
	}
	return (
		<>
		<div className={styles.contentBox({ background: backgroundColor })}>
			<ReviewInfoTop
				username={username}
				star={star}
				writtenDate={writtenDate}
				handleToggleReviewIds={handleToggleReviewIds}
			/>
			{showContents &&
				<Divider thickness={1} color='gray200' direction='horizontal' />
			}
			<div className={styles.contentBottom}>
				{showContents && reviewImageList.length > 0 &&
				<ImageCarousel
					imageList={reviewImageList}
					handleThumbnailClick={handleThumbnailClick}
					width={100}
					height={100}
				/>
				}
				<div className={styles.contents} onClick={handleToggleReviewIds}>
					{!showContents && reviewImageList.length > 0 && <SvgIcon src={PictureIcon} size={24} />}
					<Text type='body2' className={!showContents ? ellipsis({ lineSize: 'line1' }) : ''}>
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

export default ReviewInfoWithImages;