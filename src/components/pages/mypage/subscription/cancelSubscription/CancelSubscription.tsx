'use client';
import * as styles from './CancelSubscription.css';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ReasonSelectionForm from "@/components/pages/mypage/common/reasonSelectionForm/ReasonSelectionForm";
import InfoText from "@/components/pages/mypage/common/infoText/InfoText";
import CancelSubscriptionNotice
	from "@/components/pages/mypage/subscription/cancelSubscription/cancelSubscriptionNotice/CancelSubscriptionNotice";
import { useBackNavigation } from "@/utils";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { SubscriptionCancelOrderStatus } from "@/types";

function getStatusGroup(status: SubscriptionCancelOrderStatus): 'before_paying' | 'payment_done' | 'after_producing' | null {
	switch (status) {
		case 'BEFORE_PAYMENT':
			return 'before_paying';
		case 'PAYMENT_DONE':
			return 'payment_done';
		case 'PRODUCING':
		case 'DELIVERY_READY':
		case 'DELIVERY_START':
		case 'DELIVERY_DONE':
		case 'CONFIRM':
			return 'after_producing';
		default:
			return null;
	}
}

interface CancelSubscriptionProps {
	subscriptionId: number;
}

const feedbackReasons = [
	{ id: 'not_eating', label: '아이가 잘 먹지 않아요' },
	{ id: 'feeding_inconvenient', label: '급여 방식이 너무 번거로워요' },
	{ id: 'want_smaller_sample', label: '더 작은 용량의 샘플을 구매하고 싶어요' },
	{ id: 'packaging_issue', label: '제품 패키징이 불편해요' },
	{ id: 'dont_know_how', label: '급여 방법을 잘 모르겠어요' },
	{ id: 'other', label: '기타' },
];

const CancelSubscription = ({ subscriptionId }: CancelSubscriptionProps) => {
	const { data: subscriptionDetail } = useGetSubscriptionDetail(subscriptionId);
	const searchParams = useSearchParams();
	const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
	const [otherReason, setOtherReason] = useState<string>('');
	const goBack = useBackNavigation();
	const orderStatus = getStatusGroup(searchParams.get('orderStatus') as SubscriptionCancelOrderStatus);

	// const isPaymentDone = orderStatus === 'payment_done';
	const isBeforePaying = orderStatus === 'before_paying';
	const isAfterProducing = orderStatus === 'after_producing';

	const { completedMode, enableCompletedMode } = useCompletedMode();

	const handleCancelSubscription = () => {
		// 구독 해지 로직 적용 필요
	}
	return (
		<section>
			{!completedMode ? (
				<CancelSubscriptionNotice
					subscriptionDetail={subscriptionDetail}
					enableCompletedMode={enableCompletedMode}
					isBeforePaying={isBeforePaying}
					isAfterProducing={isAfterProducing}
				/>
			) : (
				<>
					<ReasonSelectionForm
						title={`정기구독을 해지하는\n가장 큰 이유는 무엇인가요?`}
						subTitle={`바프독이 더 나은 서비스를 제공할 수 있도록\n중단하시는 이유를 알려주세요.`}
						reasons={feedbackReasons}
						selectedReasons={selectedReasons}
						setSelectedReasons={setSelectedReasons}
						otherReason={otherReason}
						setOtherReason={setOtherReason}
						confirmButtonText='구독해지'
						onConfirm={handleCancelSubscription}
						onCancel={goBack}
					/>
					<div className={styles.cancellationInfo}>
						<InfoText text={`‘구독 해지 시’ 진행 예정된 정기구독 서비스가 즉각 중지됩니다.`} color='gray500'/>
						<InfoText text={`‘현재 진행중 회차’ 의 경우 생산 전에 한하여 취소가 진행되며, 생산중 상태 돌입 시 해당 회차의 상품이 마지막으로 배송됩니다.`} color='gray500'/>
					</div>
				</>
			)}
		</section>
	);
};

export default CancelSubscription;