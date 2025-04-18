'use client';
import { useEffect } from "react";
import * as styles from './SubscriptionDetail.css';
import { pointColor } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import DogInfo from "@/components/pages/mypage/common/information/section/DogInfo";
import AddressInfo from "@/components/pages/mypage/common/information/section/AddressInfo";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import SubscriptionCardInfo from "@/components/pages/mypage/common/information/section/SubscriptionCardInfo";
import SubscriptionPaymentInfo from "@/components/pages/mypage/common/information/section/SubscriptionPaymentInfo";
import SubscriptionPaymentMethodInfo
	from "@/components/pages/mypage/common/information/section/SubscriptionPaymentMethodInfo";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { subscriptionPlanInfo } from '@/constants';
import { usePaymentMethodDetail } from "@/hooks/usePaymentMethodDetail";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { useGetDogDetail } from "@/api/dog/queries/useGetDogDetail";
import { PlanKey } from "@/types";

interface SubscriptionDetailProps {
	subscriptionId: number;
}

const SubscriptionDetail = ({ subscriptionId }: SubscriptionDetailProps) => {
	const { pushWithQuery } = useDynamicQueryPush();
	const { data: subscriptionDetail } = useGetSubscriptionDetail(subscriptionId);
	const { data: dogDetail } = useGetDogDetail(subscriptionDetail?.dogId, {
		enabled: !!subscriptionDetail?.dogId, // dogId가 있을 때만 실행
	});

	const setPaymentMethodDetail = usePaymentMethodDetail();

	const transformedSubscriptionDetail = subscriptionDetail
		? (({ subscribeStatus, ...rest }) => ({ ...rest, status: subscribeStatus }))(subscriptionDetail)
		: null;
	const weeklyPaymentCycle = subscriptionPlanInfo[transformedSubscriptionDetail?.plan as PlanKey].weeklyPaymentCycle;

	console.log('transformedSubscriptionDetail', transformedSubscriptionDetail)


	useEffect(() => {
		setPaymentMethodDetail(subscriptionId);
	}, [])


	const handleChangePaymentMethod = () => {
		console.log('handleChangePaymentMethod!!!!!!', subscriptionId)
		// onToggle();
	}

	return (
		<section>
			<article className={styles.subscriptionDetailBox}>
				<DefaultText type='title4'>
					<span className={pointColor}>{weeklyPaymentCycle}주</span>마다<br/>
					정기 구독 상품을 받고 있어요
				</DefaultText>
				<SubscriptionCard data={transformedSubscriptionDetail} type='subscriptionDetail' className={styles.subscriptionDetailCard} />
			</article>
			<SubscriptionPaymentInfo data={transformedSubscriptionDetail} />
			<SubscriptionCardInfo
				data={transformedSubscriptionDetail}
				subscriptionId={subscriptionId}
			/>
			<AddressInfo
				data={transformedSubscriptionDetail}
				showEditAddressInfo
				editAddressInfoButtonType='full-button'
			/>
			<SubscriptionPaymentMethodInfo
				data={transformedSubscriptionDetail}
				handleChangePaymentMethod={handleChangePaymentMethod}
			/>
			{dogDetail?.dogDto &&
				<DogInfo data={dogDetail?.dogDto} showEditDogInfo />
			}
			<div className={styles.cancelSubscriptionContainer}>
				<button onClick={() => pushWithQuery(`/mypage/subscription/${subscriptionId}/cancel-subscription`, {})}>
					<DefaultText type='label4' color='gray700'>해지하기</DefaultText>
				</button>
			</div>
		</section>
	);
};

export default SubscriptionDetail;