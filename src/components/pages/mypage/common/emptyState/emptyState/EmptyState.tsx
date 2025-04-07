'use client';
import * as styles from './EmptyState.css';
import EmptyStateCard from "@/components/pages/mypage/common/cards/section/EmptyStateCard";
import DefaultText from "@/components/common/defaultText/DefaultText";
import 'swiper/css';
import RecommendItems from "@/components/pages/mypage/common/recommendItems/RecommendItems";

interface EmptyStateReviewProps {
	type?: 'review' | 'orderDeliveryInquiry';
	hasOrderHistory?: boolean;
}

const EmptyState = ({ type = 'review', hasOrderHistory = false }: EmptyStateReviewProps) => {
	return (
		<>
			<EmptyStateCard
				type={
					type === 'orderDeliveryInquiry'
						? 'orderDeliveryInquiry'
						: hasOrderHistory
							? 'review'
							: 'orderDeliveryInquiry'
				}
			/>
			{(type !== 'orderDeliveryInquiry' ? !hasOrderHistory : true) &&
				<RecommendItems />
			}
		</>
	);
};

export default EmptyState;