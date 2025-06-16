import {Fragment, useEffect} from "react";
import * as styles from "@/components/pages/mypage/common/information/Information.css";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import Chips from "@/components/common/chips/Chips";
import useModal from "@/hooks/useModal";
import { IAMPORT_MIN_PAYMENT_PRICE, ORDER_TYPE } from "@/constants";
import { useToastStore } from "@/store/useToastStore";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { useCancelUsingCoupon } from "@/api/subscription/mutations/useCancelUsingCoupon";
import { useUpdateUsingCoupon } from "@/api/subscription/mutations/useUpdateUsingCoupon";
import { useCouponStore } from "@/store/order/useCouponStore";
import { Coupon } from "@/types";
import CouponCancelBottomSheet
	from "@/components/pages/mypage/common/bottomSheet/couponCancelBottomSheet/CouponCancelBottomSheet";
import { pointColor } from "@/styles/common.css";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import CouponModal from "@/components/common/modal/couponModal/CouponModal";

// 버튼을 클릭한 현재 시각이 nextPaymentDate 보다 이전이고, 같은 날짜의 자정(midnight) 이후인지 확인
function isNowBetweenMidnightAndPayment(nextPaymentDateISO: string) {
	const paymentDate = new Date(nextPaymentDateISO);
	const now = new Date();
	const midnight = new Date(paymentDate);
	midnight.setHours(0, 0, 0, 0);

	return now > midnight && now < paymentDate;
}

interface SubscriptionPaymentInfoProps {
	data: any;
	isSubscriptionStatusWillCancel: boolean;
}

type CouponWithId = Coupon & { id: number };

const SubscriptionPaymentInfo = ({
	data,
	isSubscriptionStatusWillCancel = false,
}: SubscriptionPaymentInfoProps) => {
	const orderPrice = data.nextPaymentPrice;
	const orderType = ORDER_TYPE.SUBSCRIPTION;

	const { data: coupons } = useGetCouponList();
	const { mutate: cancelUsingCouponMutate } = useCancelUsingCoupon();
	const { mutate: updateUsingCouponMutate } = useUpdateUsingCoupon();
	const { isOpen: isOpenCouponBlockedModal, onClose: onCloseCouponBlockedModal, onToggle: onToggleCouponBlockedModal } = useModal();
	const { isOpen: isOpenCouponModal, onClose: onCloseCouponModal, onToggle: onToggleCouponModal } = useModal();
	const { isOpen: isOpenCouponCancelBottomSheet, onClose: onCloseCouponCancelBottomSheet, onToggle: onToggleCouponCancelBottomSheet } = useModal();

	const { addToast } = useToastStore();
	const { setMaxAvailableCouponDiscount } = useCouponStore();

	const normalizedCoupons = (coupons as CouponWithId[]).map(({ id, ...rest }) => ({ ...rest, memberCouponId: id,  }));

	const subscriptionOrderStatus = 'BEFORE_PAYMENT';
	const isBeforePaying = subscriptionOrderStatus === 'BEFORE_PAYMENT';

	// const hasUsingCoupon = data?.usingMemberCouponId;
	const hasUsingCoupon = true;
	const calcNextPaymentPrice = data?.nextPaymentPrice - data?.discountCoupon;
	const paymentPrice = hasUsingCoupon ? `${calcNextPaymentPrice.toLocaleString()}원` : `${data.nextPaymentPrice.toLocaleString()}원`;

	const isBlockedUsingCoupon = isNowBetweenMidnightAndPayment("2025-04-23T23:27:25");

	const usingCoupon = {
		memberCouponId: data?.usingMemberCouponId,
		couponName: data?.couponName,
		discount: data?.discountCoupon,
	}

	const usingCouponValue = {
		paymentPrice: {
			label: '구독 금액',
			value: `${data?.nextPaymentPrice.toLocaleString()}원`
		},
		discountCoupon: {
			label: '쿠폰 사용',
			value: `-${data?.discountCoupon.toLocaleString()}원`
		}
	}

	const paidInfo = [
		{
			label: '현재 회차',
			subLabel: `${data.subscribeCount}회차 결제 금액`,
			value: '적용 필요',
			usingCouponValue: (hasUsingCoupon && isBeforePaying) ? {...usingCouponValue} : null,
		},
		{
			label: '다음 회차',
			subLabel: !isSubscriptionStatusWillCancel
				? `${data.subscribeCount+1}회차 결제 금액`
				: <span className={pointColor}>구독 해지 적용</span>,
			value: !isSubscriptionStatusWillCancel ? paymentPrice : '',
			usingCouponValue: (hasUsingCoupon && !isBeforePaying) ? {...usingCouponValue} : null,
		}
	]

	const maxAvailableCouponDiscount = data.nextPaymentPrice - IAMPORT_MIN_PAYMENT_PRICE;
	useEffect(() => {
		setMaxAvailableCouponDiscount(maxAvailableCouponDiscount);
	}, [isOpenCouponModal]);


	const handleCouponModal = () => {
		if (isBlockedUsingCoupon) {
			onToggleCouponBlockedModal();
			return;
		}
		if (hasUsingCoupon) {
			onToggleCouponCancelBottomSheet();
		} else {
			onToggleCouponModal();
		}
	}

	const handleUseCoupon = (selectedCoupon: { couponId: number; discountAmount: number}) => {
		const body = {
			memberCouponId: selectedCoupon.couponId,
			discount: selectedCoupon.discountAmount,
			overDiscount: 0,
		};
		updateUsingCouponMutate(
			{ subscriptionId: data.id, body },
			{
				onSuccess: () => {
					onCloseCouponModal();
					addToast('쿠폰 적용이 완료됐어요');
				},
				onError: (err) => {
					console.log(err);
					addToast('쿠폰 적용에 실패했어요', 'above-button');
					setMaxAvailableCouponDiscount(maxAvailableCouponDiscount);
				}
			}
		);
	}

	const handleCancelUsingCoupon = () => {
		cancelUsingCouponMutate(
			{ subscriptionId: data.id, usingCouponId: data.usingMemberCouponId },
			{
				onSuccess: () => {
					onCloseCouponCancelBottomSheet();
					onToggleCouponModal();
					setTimeout(() => {
						addToast('쿠폰 적용을 취소했어요', 'above-button')
					}, 300)
				},
			}
		)
	}

	return (
		<>
		<InfoSection
			title="결제 예정 금액"
			isDefaultOpen
			gap={12}
		>
			<div className={styles.infoBoxItemColumn}>
				{paidInfo.map((info, index) => {
					const paymentPrice = info?.usingCouponValue?.paymentPrice;
					const discountCoupon = info?.usingCouponValue?.discountCoupon;
					return (
						<Fragment key={info.label}>
							<div className={styles.subscriptionPaymentItem}>
								<div className={styles.infoBoxItem}>
									<Chips variant='outlined' size='sm' borderRadius='lg'>{info.label}</Chips>
									<div className={styles.subscriptionCardInfo}>
										<DefaultText type='label2' color='gray700'>{info.subLabel}</DefaultText>
										{hasUsingCoupon && paymentPrice && discountCoupon &&
											<div>
												<DefaultText type='body3' color='gray600' block>{paymentPrice.label}</DefaultText>
												<DefaultText type='body3' color='gray600'>{discountCoupon.label}</DefaultText>
											</div>
										}
									</div>
								</div>
								<div className={`${styles.subscriptionCardInfo} ${styles.subscriptionPaymentDiscount}`}>
									<DefaultText type='headline2'>{info.value}</DefaultText>
									{hasUsingCoupon && paymentPrice && discountCoupon &&
									<div className={styles.subscriptionPaymentDiscount}>
										<DefaultText type='body3' color='gray600' block>{paymentPrice.value}</DefaultText>
										<DefaultText type='body3' color='red'>{discountCoupon.value}</DefaultText>
									</div>
									}
								</div>
							</div>
							{index === 0 && <Divider thickness={1} color='gray200' />}
						</Fragment>
					)
				})}
			</div>
			{!isSubscriptionStatusWillCancel &&
				<Button variant="outline" fullWidth size="sm" onClick={handleCouponModal} className={styles.couponButton}>
					{hasUsingCoupon ? '쿠폰 적용 변경' : `${isBlockedUsingCoupon || isBeforePaying ? '이번' : '다음'} 회차에 쿠폰 적용`}
				</Button>
			}
		</InfoSection>
		{isOpenCouponBlockedModal &&
			<AlertModal
				title={'이번 회차에는\n쿠폰을 적용할 수 없어요'}
				content='결제 예정일 자정이 지나 적용이 불가능해요. 다음 회차에 쿠폰을 적용해 주세요'
				isOpen={isOpenCouponBlockedModal}
				onClose={onCloseCouponBlockedModal}
				confirmText='확인'
				onConfirm={onCloseCouponBlockedModal}
			/>
		}
		{isOpenCouponModal &&
			<CouponModal
				orderType={orderType}
				coupons={normalizedCoupons}
				isOpen={isOpenCouponModal}
				onClose={() => {
					onCloseCouponModal();
					addToast('쿠폰 적용을 취소했어요', 'bottom', 1000);
				}}
				orderPrice={orderPrice}
				onUseCoupon={handleUseCoupon}
			/>
		}
		{isOpenCouponCancelBottomSheet &&
			<CouponCancelBottomSheet
				title={'먼저 적용 중인\n쿠폰을 취소해 주세요!'}
				subTitle={'이미 적용중인 쿠폰이 존재합니다. 쿠폰을 변경하고 싶으시다면\n현재 등록된 쿠폰의 적용을 취소해 주세요!'}
				isOpen={isOpenCouponCancelBottomSheet}
				onClose={onCloseCouponCancelBottomSheet}
				usingCoupon={usingCoupon}
				coupons={normalizedCoupons}
				orderPrice={orderPrice}
				handleCancel={handleCancelUsingCoupon}
				confirmText='적용 취소 및 변경'
				closeText='이전'
			/>
		}
		</>
	);
};

export default SubscriptionPaymentInfo;