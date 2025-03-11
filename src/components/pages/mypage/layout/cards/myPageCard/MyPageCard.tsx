import * as styles from './MyPageCard.css';
import React from 'react';
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ProgressBar from "@/components/common/progressBar/ProgressBar";
import Card from "@/components/common/card/Card";
import SubscriptionControls from "@/components/pages/mypage/layout/cards/myPageCard/subscriptionControls/SubscriptionControls";
import { getProductionDates } from "@/utils";
import { OrderProgressInfo } from "@/types";
import { ORDER_PROGRESS, ORDER_STATUS_MESSAGES } from "@/constants/mypage";

interface MyPageCardProps {
	// 마이페이지 메인 리스트 데이터, 구독 관리 리스트 데이터 타입 정의 및 적용 필요
	data: any;
	type: 'mypage' | 'subscription';
}

const MyPageCard = ({ data, type = 'mypage' }: MyPageCardProps) => {
	const productionDates =
		data && typeof data.nextDeliveryDate === 'string'
			? getProductionDates(data.nextDeliveryDate) : undefined;

	const status = 'PAYMENT_DONE';
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
				{type === 'subscription' &&
					<DefaultText type='caption' color='gray600' inlineBlock>
						&nbsp;&nbsp;시작일 {data?.startDated || ''}
					</DefaultText>
				}
			</DefaultText>
			<div className={styles.petInfoBox}>
				<Image
					src={data?.pictureUrl || NoImage}
					alt='반려견 이미지'
					width={type === 'mypage' ? 72 : 76}
					height={type === 'mypage' ? 72 : 76}
					style={{ borderRadius: '8px' }}
					className={styles.petAvatar}
				/>
				<div className={styles.petName}>
					<DefaultText type='headline1'>{data.name}</DefaultText>
					<DefaultText type='caption'>
						식사용 24팩 4주간격 연간플랜적용<br/>
						스타터 프리미엄 & 프리미엄 비프
					</DefaultText>
					{type === 'subscription' &&
						<DefaultText type='label3'>{data?.orderPrice?.toLocaleString() || 0}원</DefaultText>
					}
				</div>
			</div>
			<div className={styles.petSubscribeStatus({ hasStatusLabel: type === 'mypage' && !!getOrderProgressInfo(status).label })}>
				{type === 'mypage' && getOrderStatusMessage(status) &&
					<div className={styles.statusInfoText}>
						<DefaultText type='caption' color='red'>{getOrderStatusMessage(status, data.subscribeCount + 1)}</DefaultText>
					</div>
				}
				{(type === 'subscription' ? (status !== 'SUBSCRIBE_PENDING' && status !== 'SUBSCRIBE_CANCEL') : true) &&
					<ProgressBar progress={getOrderProgressInfo(status).progress} label={type === 'mypage' ? getOrderProgressInfo(status).label: undefined} />
				}
				{(type === 'subscription' ? (status !== 'SUBSCRIBE_PENDING' && status !== 'SUBSCRIBE_CANCEL') : true) &&
					<div className={styles.statusInfo}>
						<DefaultText type='caption'>
							{productionDates?.productionDate} {getOrderProgressInfo(status).statusText?.payment}
						</DefaultText>
						<DefaultText type='caption' color='gray600'>
							{productionDates?.receivingDate} {getOrderProgressInfo(status).statusText?.delivery}
						</DefaultText>
					</div>
				}
			</div>
			<SubscriptionControls type={type} status={status} subscribeId={data.subscribeId} />
		</Card>
	);
};

export default MyPageCard;