'use client';
import EmptyStateCard from "@/components/pages/mypage/common/cards/section/EmptyStateCard";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";

interface EmptyStateReviewProps {
	type?: 'review' | 'orderDeliveryInquiry' | 'writtenReviewList';
	hasOrderHistory?: boolean;
}

const EmptyState = ({
	type = 'review',
	hasOrderHistory = false,
}: EmptyStateReviewProps) => {
	return (
		<>
			{type !== 'writtenReviewList'
				? <EmptyStateCard
					type={
						type === 'orderDeliveryInquiry'
							? 'orderDeliveryInquiry'
							: hasOrderHistory
								? 'review'
								: 'orderDeliveryInquiry'
					}
				/>
				: <DefaultEmptyState title='아직 작성하신 리뷰가 없어요!' subTitle='작성 가능한 리뷰를 확인해보세요' />
			}
			{(type === 'review' ? !hasOrderHistory : true) &&
				<></>
			}
		</>
	);
};

export default EmptyState;