'use client';
import { useState } from "react";
import * as styles from './PostponeShippingModal.css';
import { pointColor } from "@/styles/common.css";
import { addDays, format } from "date-fns";
import CheckCircle from '/public/images/mypage/check_circle.svg'
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InfoBox from "@/components/common/infoBox/InfoBox";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DelayWeekPicker
	from "@/components/pages/mypage/common/modal/postponeShippingModal/delayWeekPicker/DelayWeekPicker";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
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

	const nextCycle = detail.subscribeCount + 1;
	const defaultNextDeliveryDate =  detail.nextDeliveryDate ? format(new Date(detail.nextDeliveryDate), 'yyyy.MM.dd') : selectedDate;
	const newNextDeliveryDate = selectedDate ? format(addDays(new Date(selectedDate), 7), 'yyyy.MM.dd'): '';

	const handleClose = () => {
		setCompletedMode(false);
		if(onClose) {
			onClose();
		}
	}

	const handleSubmit = () => {
		if (!completedMode) {
			setCompletedMode(true);
		} else {
			handleClose();
		}
	}

	return (
		<FullModalWrapper
			headerTitle={!completedMode ? '배송 미루기' : ' '}
			isVisible={isOpen}
			handleClose={handleClose}
		>
			{!completedMode ? (
				<>
					<div className={styles.userShippingBox}>
						<div className={styles.userShippingText}>
							<DefaultText type='title3'>
								이번 회차(<span className={pointColor}>{nextCycle}회차</span>)의<br/>
								발송 예정일을 변경할 수 있어요
							</DefaultText>
							<DefaultText type='body2' color='gray600'>발송 예정일은 최대 8주까지 미룰 수 있습니다</DefaultText>
						</div>
						<div className={styles.userShippingDate}>
							<div className={styles.dateBox}>
								<DefaultText type='caption' color='gray500'>
									기존 발송 예정일
								</DefaultText>
								<DefaultText type='label1'>
									{defaultNextDeliveryDate} (화)
								</DefaultText>
							</div>
							<div className={styles.dateBox}>
								<DefaultText type='caption' color='gray500'>
									신규 발송 예정일
								</DefaultText>
								<DefaultText type='label1' color='red'>
									{newNextDeliveryDate} (화)
								</DefaultText>
							</div>
						</div>
					</div>
					{detail.nextDeliveryDate ?
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
				</>
			) : (
				<div className={styles.completedBox}>
					<SvgIcon src={CheckCircle} size={48} color='red' />
					<div className={styles.completedBoxInfo}>
						<DefaultText type='title1'>미루기 완료</DefaultText>
						<DefaultText type='body2' color='gray600' align='center'>
							{detail.dogName}의<br/>
							<DefaultText type='label2'>정기배송 {nextCycle}회차 도착 예정일</DefaultText>
							이 변경되었습니다
						</DefaultText>
						<Card shadow='none' className={styles.completedBoxDateInfo}>
							<div className={styles.completedDate}>
								<DefaultText type='body3' color='gray600'>기존 발송 예정일</DefaultText>
								<DefaultText type='body2' color='gray700'>{defaultNextDeliveryDate} (화)</DefaultText>
							</div>
							<Divider thickness={2} color='gray200' />
							<div className={styles.completedDate}>
								<DefaultText type='body3' color='red'>신규 발송 예정일</DefaultText>
								<DefaultText type='body2' color='red'>{newNextDeliveryDate} (화)</DefaultText>
							</div>
						</Card>
					</div>
				</div>
			)
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