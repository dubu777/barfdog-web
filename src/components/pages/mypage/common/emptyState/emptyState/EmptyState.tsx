'use client';
import * as styles from './EmptyState.css';
import EmptyStateCard from "@/components/pages/mypage/layout/cards/section/EmptyStateCard";
import DefaultText from "@/components/common/defaultText/DefaultText";
import 'swiper/css';
import RecommendItems from "@/components/pages/mypage/layout/recommendItems/RecommendItems";

interface EmptyStateReviewProps {
	type?: 'review' | 'orderDeliveryInquiry';
	hasOrderHistory?: boolean;
	isWrittenReview?: boolean;
}

const EmptyState = ({ type = 'review', hasOrderHistory = false, isWrittenReview = false }: EmptyStateReviewProps) => {
	return (
		<>
			{!isWrittenReview
				? <EmptyStateCard
					type={
						type === 'orderDeliveryInquiry'
							? 'orderDeliveryInquiry'
							: hasOrderHistory
								? 'review'
								: 'orderDeliveryInquiry'
					}
				/>
				: <div className={styles.emptyText}>
						<DefaultText type='label1' color='gray700' align='center'>아직 작성하신 리뷰가 없어요!</DefaultText>
						<DefaultText type='body3' color='gray600' align='center'>작성 가능한 리뷰를 확인해보세요</DefaultText>
				</div>
			}
			{(type !== 'orderDeliveryInquiry' ? !hasOrderHistory : true) &&
				<RecommendItems />
			}
		</>
	);
};

export default EmptyState;