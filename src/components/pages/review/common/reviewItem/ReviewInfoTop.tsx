import * as styles from './ReviewItem.css';
import Text from "@/components/common/text/Text";
import RateStar from "@/components/common/rateStar/RateStar";

interface ReviewInfoTopProps {
	username: string;
	star: number;
	writtenDate: string;
	onToggle?: () => void;
	isExpanded?: boolean;
}

export default function ReviewInfoTop({
	username,
	star,
	writtenDate,
	onToggle,
	isExpanded,
}: ReviewInfoTopProps) {
	return (
		<div className={styles.contentTop({ isExpanded })} onClick={onToggle || undefined}>
			<div>
				<Text type='body3' block className={styles.username}>{username}</Text>
				<RateStar rateLength={5} value={star} size={24} />
			</div>
			<Text type='body3'>{writtenDate}</Text>
		</div>
	);
};