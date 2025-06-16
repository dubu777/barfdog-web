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
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import useModal from "@/hooks/useModal";
import CouponCancelBottomSheet
	from "@/components/pages/mypage/common/bottomSheet/couponCancelBottomSheet/CouponCancelBottomSheet";
import CompletedBox from "@/components/common/completedBox/CompletedBox";
import { useCompletedMode } from "@/hooks/useCompletedMode";

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
	
	const { completedMode, enableCompletedMode, disableCompletedMode } = useCompletedMode();
	const [selectedDate, setSelectedDate] = useState(nextDeliveryDate);

	const nextCycle = detail.subscribeCount + 1;
	const defaultNextDeliveryDate =  detail.nextDeliveryDate ? format(new Date(detail.nextDeliveryDate), 'yyyy.MM.dd') : selectedDate;
	const newNextDeliveryDate = selectedDate ? format(addDays(new Date(selectedDate), 7), 'yyyy.MM.dd'): '';


	const { isOpen: isOpenCouponCancelBottomSheet, onClose: onCloseCouponCancelBottomSheet, onToggle: onToggleCouponCancelBottomSheet } = useModal();
	const subscriptionOrderStatus = 'BEFORE_PAYMENT';
	const isPrePayment = subscriptionOrderStatus === 'BEFORE_PAYMENT';

	const hasUsingCoupon = !!detail?.usingMemberCouponId;

	const usingCoupon = detail?.usingMemberCouponId ? {
		memberCouponId: detail.usingMemberCouponId,
		couponName: detail?.couponName,
		discount: detail?.discountCoupon,
	} : null;
	
	const handleClose = () => {
		disableCompletedMode();
		if(onClose) {
			onClose();
		}
	}

	const handlePostponeShipping = () => {
		enableCompletedMode();
		if (isOpenCouponCancelBottomSheet) {
			onCloseCouponCancelBottomSheet();
		}
	}

	const handleSubmit = () => {
		if (!completedMode) {
			if (hasUsingCoupon) {
				onToggleCouponCancelBottomSheet();
			} else {
				// mutation 적용 필요
				handlePostponeShipping();
			}
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
								{isPrePayment ? '이번' : '다음'} 회차(<span className={pointColor}>{nextCycle}회차</span>)의<br/>
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
								<DelayWeekPicker
									defaultDate={new Date(detail.nextDeliveryDate)}
									onChange={(value) => setSelectedDate(value)}
									isFixedOpen
								/>
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
						: <div>
							<SubscriptionCard data={detail} type='mypage' />
						</div>
					}
				</>
			) : (
				<CompletedBox>
					<DefaultText type='title1'>미루기 완료</DefaultText>
					<DefaultText type='body2' color='gray600' align='center'>
						{detail.dogName}의<br/>
						<DefaultText type='label2'>정기배송 {nextCycle}회차 도착 예정일</DefaultText>
						이 변경되었습니다
					</DefaultText>
					<Card shadow='none' padding='20/16' className={styles.completedBoxDateInfo}>
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
				</CompletedBox>
			)
			}
			<ButtonDocked
				type='full-button'
				primaryButtonLabel={!completedMode ? '변경완료' : '확인'}
				onPrimaryClick={handleSubmit}
			/>
			{isOpenCouponCancelBottomSheet && hasUsingCoupon && usingCoupon &&
				<CouponCancelBottomSheet
					title={'배송 미루기를 진행하면\n적용된 쿠폰이 해제돼요'}
					subTitle={'배송미루기를 하고 결제 예정일이 미뤄져 쿠폰 유효기간 이후로 넘어가면, 동일한 쿠폰이라도 다시 사용할 수 없을 수 있어요.'}
					isOpen={isOpenCouponCancelBottomSheet}
					onClose={onCloseCouponCancelBottomSheet}
					usingCoupon={usingCoupon}
					handleCancel={handlePostponeShipping}
					confirmText='내용 확인하고 미루기 진'
					closeText='취소'
				/>
			}
		</FullModalWrapper>
	);
};

export default PostponeShippingModal;