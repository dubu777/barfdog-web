'use client';
import * as styles from '../BillingPreferences.css';
import Text from "@/components/common/text/Text";
import PaymentCard from "@/components/pages/mypage/common/paymentCard/PaymentCard";
import { useGetPaymentList } from "@/api/mypage/queries/useGetPaymentList";
import { PaymentItem } from "@/types";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";

const PaymentMethod = () => {
	const { pushWithQuery } = useDynamicQueryPush();
	const { setPaymentMethodDetail } = usePersistMypageStore();
	const { data: paymentList } = useGetPaymentList();
	// const paymentList = [];

	const handleMoveToCardDetail = (cardData: PaymentItem, cardId: number) => {
		setPaymentMethodDetail(cardData)
		pushWithQuery(
			`/mypage/billing-preferences/payment-method/${cardId}`,
			{ subscriptionId: cardData.subscribeCardDto.subscribeId }
		);
	}

	const handleAddPaymentMethod = () => {
		console.log('handleAddPaymentMethod')
	}
	return (
		<section className={styles.billingPreferencesBox}>
			<article className={styles.paymentCardList}>
				{paymentList.length < 1
					? <></>
					: paymentList.map((payment: PaymentItem) => {
						const { subscribeCardDto: cardDetail, paymentMethod } = payment;
						return (
							<PaymentCard
								key={cardDetail.cardId}
								paymentMethod={paymentMethod}
								cardName={cardDetail.cardName || undefined}
								cardNumber={cardDetail.cardNumber || undefined}
								// handleClick={() => handleMoveToCardDetail(payment, cardDetail.cardId)}
								// isEmpty={false}
							/>
						)
					})
				}
			</article>
			<article className={styles.paymentCardPolicyInfo}>
				<Text type='caption' color='gray500'>• 정기구독 예약에 연동된 카드 및 카드번호 앞 6자리가 표기됩니다</Text>
				<Text type='caption' color='gray500'>• 간편결제(네이버·카카오) 사용 시, 당사에서 카드명 확인 불가합니다</Text>
			</article>
		</section>
	);
};

export default PaymentMethod;