import { contentTop, contentReviewer } from "./ReviewItem.css";
import Text from "@/components/ui/text/Text";
import RateStar from "@/components/ui/rateStar/RateStar";
import { maskString } from "@/utils/maskString";

interface ReviewInfoTopProps {
	reviewer: string;
	star: number;
	writtenDate: string;
	onToggle?: () => void;
	isExpanded?: boolean;
}

export default function ReviewInfoTop({
	reviewer,
	star,
	writtenDate,
	onToggle,
	isExpanded,
}: ReviewInfoTopProps) {
	return (
		<div className={contentTop({ isExpanded })} onClick={onToggle || undefined}>
			<div>
				<Text type='body3' block className={contentReviewer}>{maskString(reviewer, 1, 1)}</Text>
				<RateStar rateLength={5} value={star} size={24} />
			</div>
			<Text type='body3'>{writtenDate}</Text>
		</div>
	);
};