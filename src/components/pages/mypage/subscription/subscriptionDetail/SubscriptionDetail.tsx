'use client';
import * as styles from './SubscriptionDetail.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import SubscriptionInfo from "@/components/pages/mypage/common/information/section/SubscriptionInfo";
import PaymentInfo from "@/components/pages/mypage/common/information/section/PaymentInfo";
import PetInfo from "@/components/pages/mypage/common/information/section/PetInfo";
import AddressInfo from "@/components/pages/mypage/common/information/section/AddressInfo";
import OrderItemInfo from "@/components/pages/mypage/common/information/section/OrderItemInfo";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { useGetDogDetail } from "@/api/dog/queries/useGetDogDetail";
import { ORDER_TYPE } from '@/constants';

interface SubscriptionDetailProps {
	subscriptionId: number;
}

const SubscriptionDetail = ({ subscriptionId }: SubscriptionDetailProps) => {
	const { pushWithQuery } = useDynamicQueryPush();
	const { data: subscriptionDetail } = useGetSubscriptionDetail(subscriptionId);
	const { data: dogDetail } = useGetDogDetail(subscriptionDetail?.dogId, {
		enabled: !!subscriptionDetail?.dogId, // dogId가 있을 때만 실행
	});

const transformedSubscriptionDetail = subscriptionDetail
	? (({ subscribeStatus, ...rest }) => ({ ...rest, status: subscribeStatus }))(subscriptionDetail)
	: null;

	return (
		<section>
			{/* orderType 수정 및 데이터 타입 확인 필요 */}
			<OrderItemInfo data={transformedSubscriptionDetail} orderType={ORDER_TYPE.SUBSCRIPTION} subscriptionId={subscriptionId} type='subscriptionDetail' />
			<AddressInfo data={transformedSubscriptionDetail} />
			<SubscriptionInfo
				data={transformedSubscriptionDetail}
				type='subscription'
				subscriptionId={subscriptionId}
			/>
			{dogDetail?.dogDto &&
				<PetInfo data={dogDetail?.dogDto} />
			}
			<PaymentInfo subscriptionId={subscriptionId} data={transformedSubscriptionDetail} type='subscription' />
			<div className={styles.cancelSubscriptionContainer}>
				<button onClick={() => pushWithQuery(`/mypage/subscription/${subscriptionId}/cancel-subscription`, {})}>
					<DefaultText type='label4' color='gray700'>해지하기</DefaultText>
				</button>
			</div>
		</section>
	);
};

export default SubscriptionDetail;