import * as styles from './ReviewCommonStyle.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import RateStar from "@/components/common/rateStar/RateStar";

interface ReviewInfoTopProps {
	username: string;
	star: number;
	writtenDate: string;
	handleToggleReviewIds?: () => void;
}

const ReviewInfoTop = ({
	username,
	star,
	writtenDate,
	handleToggleReviewIds,
}: ReviewInfoTopProps) => {
	return (
		<div className={styles.contentTop} onClick={handleToggleReviewIds || undefined}>
			<div>
				<DefaultText type='body3' block className={styles.username}>{username}</DefaultText>
				<RateStar rateLength={5} value={star} size={24} />
			</div>
			<DefaultText type='body3'>{writtenDate}</DefaultText>
		</div>
	);
};

export default ReviewInfoTop;