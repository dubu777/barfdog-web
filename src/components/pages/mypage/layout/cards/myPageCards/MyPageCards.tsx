import * as styles from './MyPageCards.css';
import React from 'react';
import DefaultText from "@/components/common/defaultText/DefaultText";
import PetAvatar from "@/components/pages/mypage/layout/cards/myPageCards/petAvatar/PetAvatar";
import ProgressBar from "@/components/common/progressBar/ProgressBar";
import Card from "@/components/common/card/Card";
import SubscriptionControls from "@/components/pages/mypage/layout/cards/myPageCards/subscriptionControls/SubscriptionControls";
import { getProductionDates } from "@/utils";
import { OrderProgressInfo } from "@/types";
import { ORDER_PROGRESS, ORDER_STATUS_MESSAGES } from "@/constants/mypage";

interface MyPageCardsProps {
	data: any;
}

const MyPageCards = ({ data }: MyPageCardsProps) => {
	const productionDates =
		data && typeof data.nextDeliveryDate === 'string'
			? getProductionDates(data.nextDeliveryDate) : undefined;

	const status = 'BEFORE_PAYMENT';
	const getOrderProgressInfo = (status: string): OrderProgressInfo => {
		return ORDER_PROGRESS[status] || { progress: 0 };
	};
	const getOrderStatusMessage = (status: string, n: number = 0): string | undefined => {
		return ORDER_STATUS_MESSAGES[status]?.(n) || undefined;
	};
	return (
		<Card shadow='strong'>
			<DefaultText type='label4'>
				정기배송 {data.subscribeCount}회차 진행중
			</DefaultText>
			<div className={styles.petInfoBox}>
				<PetAvatar
					petId={data.id}
					petPictureUrl={data.pictureUrl as string}
					petPictureName={data.pictureName as string}
				/>
				<div className={styles.petName}>
					<DefaultText type='headline1'>{data.name}</DefaultText>
					<DefaultText type='caption'>
						식사용 24팩 4주간격 연간플랜적용<br/>
						스타터 프리미엄 & 프리미엄 비프
					</DefaultText>
				</div>
			</div>
			<div className={styles.petSubscribeStatus({ hasStatusLabel: !!getOrderProgressInfo(status).label })}>
				{getOrderStatusMessage(status) &&
				<div className={styles.statusInfoText}>
					<DefaultText type='caption' color='red'>{getOrderStatusMessage(status, data.subscribeCount + 1)}</DefaultText>
				</div>
				}
				<ProgressBar progress={getOrderProgressInfo(status).progress} label={getOrderProgressInfo(status).label || ''} />
				<div className={styles.statusInfo}>
					<DefaultText type='caption'>
						{productionDates?.productionDate} {getOrderProgressInfo(status).statusText.payment}
					</DefaultText>
					<DefaultText type='caption' color='gray600'>
						{productionDates?.receivingDate} {getOrderProgressInfo(status).statusText.delivery}
					</DefaultText>
				</div>
			</div>
			<SubscriptionControls status={status} subscribeId={data.subscribeId} />
		</Card>
	);
};

export default MyPageCards;