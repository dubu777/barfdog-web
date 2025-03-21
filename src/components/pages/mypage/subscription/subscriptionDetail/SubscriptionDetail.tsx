'use client';
import * as styles from './SubscriptionDetail.css';
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SubscriptionInfo from "@/components/pages/mypage/layout/information/section/SubscriptionInfo";
import PaymentInfo from "@/components/pages/mypage/layout/information/section/PaymentInfo";
import PetInfo from "@/components/pages/mypage/layout/information/section/PetInfo";
import AddressInfo from "@/components/pages/mypage/layout/information/section/AddressInfo";
import OrderItemInfo from "@/components/pages/mypage/layout/information/section/OrderItemInfo";

interface SubscriptionDetailProps {
	subscriptionId: number;
}

const SubscriptionDetail = ({ subscriptionId }: SubscriptionDetailProps) => {
	const { data: subscriptionDetail } = useGetSubscriptionDetail(subscriptionId);

	const transformedSubscriptionDetail = subscriptionDetail
		? {
			...subscriptionDetail,
			status: subscriptionDetail.subscribeStatus,
		}
		: null;

	return (
		<section className={styles.subscriptionDetailContainer}>
			<OrderItemInfo data={transformedSubscriptionDetail} orderType='subscription' subscriptionId={subscriptionId} />
			<AddressInfo data={transformedSubscriptionDetail} />
			<SubscriptionInfo
				data={transformedSubscriptionDetail}
				type='subscription'
				subscriptionId={subscriptionId}
			/>
			<PetInfo data={transformedSubscriptionDetail} />
			<PaymentInfo subscriptionId={subscriptionId} data={transformedSubscriptionDetail} type='subscription' />
			<div className={styles.cancelSubscriptionContainer}>
				<button>
					<DefaultText type='label4' color='gray700'>해지하기</DefaultText>
				</button>
			</div>
		</section>
	);
};

export default SubscriptionDetail;