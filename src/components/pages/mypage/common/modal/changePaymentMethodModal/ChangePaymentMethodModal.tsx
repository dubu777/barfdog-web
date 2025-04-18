import { useState } from "react";
import * as styles from './ChangePaymentMethodModal.css';
import PaymentCard from "@/components/pages/mypage/common/paymentCard/PaymentCard";
import PaymentInfo from "@/components/pages/mypage/common/information/section/PaymentInfo";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import ChangeBottomSheet from "@/components/pages/mypage/common/modal/changePaymentMethodModal/changeBottomSheet/ChangeBottomSheet";
import TermsCheckbox from "@/components/pages/mypage/common/modal/changePaymentMethodModal/termsCheckbox/TermsCheckbox";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { calculateOriginPrice } from "@/utils/order/calculateOriginPrice";
import { PAYMENT } from "@/constants";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import { PaymentMethod, PlanKey } from "@/types";

interface ChangePaymentMethodModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
	handleChangePaymentMethod: () => void;
}

const ChangePaymentMethodModal = ({
	isOpen,
	onClose,
	data,
	handleChangePaymentMethod,
}: ChangePaymentMethodModalProps) => {
	const { paymentMethodDetail } = usePersistMypageStore();
	const cardDetail = paymentMethodDetail?.subscribeCardDto;
	const paymentMethod = paymentMethodDetail?.paymentMethod;

	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState<keyof typeof PAYMENT | null>(null);
	const [terms, setTerms] = useState({
		agreePrivacy: false,
		agreeSubscription: false,
	})
	const agreeAll = terms.agreePrivacy && terms.agreeSubscription;

	const originPrice = 
		(cardDetail?.nextPaymentPrice && cardDetail?.plan) 
		&& calculateOriginPrice(cardDetail?.nextPaymentPrice, cardDetail?.plan as PlanKey) 
		|| 0;
	const totalDiscount =
		(originPrice - (cardDetail?.nextPaymentPrice || 0))
		+ (cardDetail?.discountCoupon || 0)
		+ (cardDetail?.discountReward || 0)
		+ (cardDetail?.discountGrade || 0);

	const subscriptionPaymentData = {
		paymentMethod,
		deliveryPrice: 0,
		orderPrice: originPrice - totalDiscount,
		paymentPrice: originPrice,
		discountCoupon: cardDetail?.discountCoupon || 0,
		discountReward: cardDetail?.discountReward || 0,
		discountGrade: cardDetail?.discountGrade || 0,
		salePrice: originPrice - (cardDetail?.nextPaymentPrice || 0),
	}


	return (
		<FullModalWrapper
			headerTitle='결제수단변경'
			isVisible={isOpen}
			handleClose={onClose}
		>
			<div className={styles.paymentMethodModalContainer}>
				<div className={styles.paymentMethodImage}>
					<PaymentCard
						paymentMethod={paymentMethod as PaymentMethod}
						cardName={cardDetail?.cardName || undefined}
						cardNumber={cardDetail?.cardNumber || undefined}
					/>
				</div>
				<div className={styles.paymentInfo}>
					<PaymentInfo data={subscriptionPaymentData} type='changePaymentMethod' isDefaultOpen={false} />
				</div>
				<TermsCheckbox
					terms={terms}
					setTerms={setTerms}
					agreeAll={agreeAll}
				/>
			</div>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='결제수단 변경하기'
				onPrimaryClick={() => setIsOpenBottomSheet(true)}
				isPrimaryDisabled={!agreeAll}
			/>
			<ChangeBottomSheet
				isOpen={isOpenBottomSheet}
				onClose={() => {
					setIsOpenBottomSheet(false);
					setSelectedPayment(null);
				}}
				handleChangePaymentMethod={handleChangePaymentMethod}
				isDisabled={selectedPayment === null}
				selectedPayment={selectedPayment}
				setSelectedPayment={setSelectedPayment}
			/>
		</FullModalWrapper>
	);
};

export default ChangePaymentMethodModal;