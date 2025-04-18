'use client';
import { useState } from "react";
import * as styles from './PostponeShippingModal.css';
import { pointColor } from "@/styles/common.css";
import { addDays, format } from "date-fns";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InfoBox from "@/components/common/infoBox/InfoBox";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DelayWeekPicker
	from "@/components/pages/mypage/common/modal/postponeShippingModal/delayWeekPicker/DelayWeekPicker";
import { getProductionDates } from "@/utils";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";

interface PostponeShippingModalProps {
	subscriptionId: number;
	isOpen: boolean;
	onClose?: () => void;
}

const PostponeShippingModal = ({
	subscriptionId,
	isOpen,
	onClose,
}: PostponeShippingModalProps) => {
	const { data: detail } = useGetSubscriptionDetail(subscriptionId);
	const nextDeliveryDate = detail?.nextDeliveryDate;
	
	const [completedMode, setCompletedMode] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState(nextDeliveryDate);


	const defaultProductionDates = getProductionDates(detail.nextDeliveryDate,false, 'yyyy.MM.dd');
	const nextCycle = detail.subscribeCount + 1;

	const handleClose = () => {
		setCompletedMode(false);
		if(onClose) {
			onClose();
		}
	}

	const handleSubmit = () => {
		// 성공시 미루기 완료 페이지 redirection 필요 및 userShippingBox 컴포넌트 분리 후 적용 필요
		if (!completedMode) {
			setCompletedMode(true);
		} else {
			handleClose();
		}
	}
	return (
		<FullModalWrapper
			headerTitle={`배송 미루기${completedMode ? '완료' : ''}`}
			isVisible={isOpen}
			handleClose={handleClose}
		>
			<div className={styles.userShippingBox}>
				<div className={styles.userShippingText}>
					<DefaultText type='title4'>
						{!completedMode ? '최대 8주까지 미룰 수 있어요' : `${nextCycle}회차 미루기가 완료되었습니다`}
					</DefaultText>
					<DefaultText type='label4' color='gray600' className={styles.dogName}>
						{detail.dogName}의<br/>
						<span className={pointColor}>정기배송 {nextCycle}회차 신규 도착 예정일</span>
						{!completedMode ? '을 변경하시겠어요?' : '이 변경되었습니다.'}
					</DefaultText>
				</div>
				<div className={styles.userShippingDate}>
					<div className={styles.dateBox}>
						<DefaultText type='caption' color='gray500'>
							{!completedMode ? '기존 발송 예정일' : `${nextCycle}회차 발송 예정일`}
						</DefaultText>
						<DefaultText type='label1'>
							{!completedMode && detail.nextDeliveryDate ? format(new Date(detail.nextDeliveryDate), 'yyyy.MM.dd') : selectedDate} (화)
						</DefaultText>
					</div>
					<div className={styles.dateBox}>
						<DefaultText type='caption' color='gray500'>
							{!completedMode ? '신규 도착 예정일' : `${nextCycle + 1}회차 발송 예정일`}
						</DefaultText>
						<DefaultText type='label1' color='red'>
							{!completedMode ? selectedDate : selectedDate ? format(addDays(new Date(selectedDate), 7), 'yyyy.MM.dd'): ''} (화)
						</DefaultText>
					</div>
				</div>
			</div>
			{!completedMode && detail.nextDeliveryDate ?
				<>
					<div className={styles.selectShippingBox}>
						<DefaultText type='headline2' className={styles.selectShippingText}>발송 희망 주차를 선택해주세요</DefaultText>
						<DelayWeekPicker defaultDate={new Date(detail.nextDeliveryDate)} onChange={(value) => setSelectedDate(value)} isFixedOpen />
					</div>
					<div className={styles.shippingInfoBox}>
						<InfoBox
							color='red'
							text={
								`	'배송 희망일' 변경 시, 선택한 주차를 기준으로 전체 남은 회차의 배송 일정이 변경됩니다.
								'배송 주기'의 변경을 희망하는 경우 ‘식단 변경’ 페이지를 이용해주세요.
								'배송 희망일'이 공휴일과 겹쳤을 시 다음 영업일에 발송이 진행됩니다.`
							}
						/>
					</div>
				</>
				: <div className={styles.completedBox}>
					<SubscriptionCard data={detail} type='mypage' />
				</div>
			}
			<ButtonDocked
				type='full-button'
				primaryButtonLabel={!completedMode ? '변경완료' : '확인'}
				onPrimaryClick={handleSubmit}
			/>
		</FullModalWrapper>
	);
};

export default PostponeShippingModal;