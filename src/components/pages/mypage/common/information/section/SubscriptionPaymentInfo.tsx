import {Fragment, useEffect} from "react";
import * as styles from "@/components/pages/mypage/common/information/Information.css";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import Chips from "@/components/common/chips/Chips";
import CouponModal from "@/components/pages/order/common/modal/couponModal/CouponModal";
import useModal from "@/hooks/useModal";
import Modal from "@/components/common/modal/Modal";
import {IAMPORT_MIN_PAYMENT_PRICE, ORDER_TYPE} from "@/constants";
import { useToastStore } from "@/store/useToastStore";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { useCancelUsedCoupon } from "@/api/subscription/mutations/useCancelUsedCoupon";
import { useUpdateUsingCoupon } from "@/api/subscription/mutations/useUpdateUsingCoupon";
import { useCouponStore } from "@/store/order/useCouponStore";
import { Coupon } from "@/types";

interface SubscriptionPaymentInfoProps {
	data: any;
}

type CouponWithId = Coupon & { id: number };

const SubscriptionPaymentInfo = ({
	data,
}: SubscriptionPaymentInfoProps) => {
	const orderPrice = data.nextPaymentPrice;
	const orderType = ORDER_TYPE.SUBSCRIPTION;

	const { data: coupons } = useGetCouponList();
	const { mutate: cancelUsedCouponMutate } = useCancelUsedCoupon();
	const { mutate: updateUsingCouponMutate } = useUpdateUsingCoupon();

	const { isOpen: isOpenCouponModal, onClose: onCloseCouponModal, onToggle: onToggleCouponModal } = useModal();
	const { isOpen: isOpenCouponCancelModal, onClose: onCloseCouponCancelModal, onToggle: onToggleCouponCancelModal } = useModal();

	const { addToast } = useToastStore();
	const { setMaxAvailableCouponDiscount } = useCouponStore();

	const normalizedCoupons = (coupons as CouponWithId[]).map(({ id, ...rest }) => ({ ...rest, memberCouponId: id,  }));

	const subscriptionOrderStatus = 'PAYMENT_DONE';
	const isPrePayment = subscriptionOrderStatus === 'PAYMENT_DONE';

	const usedCoupon = data?.usingMemberCouponId;
	const calcNextPaymentPrice = data?.nextPaymentPrice - data?.discountCoupon;
	const paymentPrice = usedCoupon ? `${calcNextPaymentPrice.toLocaleString()}원` : `${data.nextPaymentPrice.toLocaleString()}원`;

	const usedCouponValue = {
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
			usedCouponValue: (usedCoupon && isPrePayment) ? {...usedCouponValue} : null,
		},
		{
			label: '다음 회차',
			subLabel: `${data.subscribeCount+1}회차 결제 금액`,
			value: paymentPrice,
			usedCouponValue: (usedCoupon && !isPrePayment) ? {...usedCouponValue} : null,
		}
	]

	useEffect(() => {
		setMaxAvailableCouponDiscount(data.nextPaymentPrice - IAMPORT_MIN_PAYMENT_PRICE);
	}, [isOpenCouponModal]);


	const handleCouponModal = () => {
		if (usedCoupon) {
			onToggleCouponCancelModal();
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
				}
			}
		);
	}

	const handleCancelUsedCoupon = () => {
		cancelUsedCouponMutate(
			{ subscriptionId: data.id, usingCouponId: data.usingMemberCouponId },
			{
				onSuccess: () => {
					onToggleCouponModal();
				},
			}
		)
	}

	return (
		<>
		<InfoSection
			title="결제 정보"
			isDefaultOpen
		>
			<div className={styles.infoBoxItemColumn}>
				{paidInfo.map((info, index) => {
					const paymentPrice = info?.usedCouponValue?.paymentPrice;
					const discountCoupon = info?.usedCouponValue?.discountCoupon;
					return (
						<Fragment key={info.label}>
							<div className={styles.subscriptionPaymentItem}>
								<div className={styles.infoBoxItem}>
									<Chips variant='outlined' size='sm' borderRadius='full'>{info.label}</Chips>
									<div className={styles.subscriptionCardInfo}>
										<DefaultText type='label2' color='gray700'>{info.subLabel}</DefaultText>
										{usedCoupon && paymentPrice && discountCoupon &&
											<div>
												<DefaultText type='body3' color='gray600' block>{paymentPrice.label}</DefaultText>
												<DefaultText type='body3' color='gray600'>{discountCoupon.label}</DefaultText>
											</div>
										}
									</div>
								</div>
								<div className={`${styles.subscriptionCardInfo} ${styles.subscriptionPaymentDiscount}`}>
									<DefaultText type='headline2'>{info.value}</DefaultText>
									{usedCoupon && paymentPrice && discountCoupon &&
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
			<Button variant="outline" fullWidth size="sm" onClick={handleCouponModal} className={styles.couponButton}>
				{usedCoupon ? '쿠폰 적용 변경' : `${isPrePayment ? '이번' : '다음'} 회차에 쿠폰 적용`}
			</Button>
		</InfoSection>
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
		{isOpenCouponCancelModal &&
			<Modal
				title='쿠폰 적용을 취소하시겠습니까?'
				content='적용된 쿠폰이 취소처리됩니다.'
				isOpen={isOpenCouponCancelModal}
				onClose={onCloseCouponCancelModal}
				cancelText='취소'
				confirmText='확인'
				onConfirm={handleCancelUsedCoupon}
				onCancel={onCloseCouponModal}
			/>
		}
		</>
	);
};

export default SubscriptionPaymentInfo;