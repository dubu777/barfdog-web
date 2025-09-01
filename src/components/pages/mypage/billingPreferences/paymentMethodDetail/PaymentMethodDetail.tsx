'use client';
import * as styles from '../BillingPreferences.css';
import { useState } from "react";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import PaymentCard from "@/components/pages/mypage/common/paymentCard/PaymentCard";
import useModal from '@/hooks/useModal';
import { useBackNavigation } from "@/utils";
import { useToastStore } from "@/store/useToastStore";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { useDeletePaymentMethod } from "@/api/mypage/mutations/useDeletePaymentMethod";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { PAYMENT } from "@/constants";
import { PaymentMethod } from '@/types';

interface PaymentMethodDetailProps {
	cardId: number;
	subscriptionId: number;
}

const PaymentMethodDetail = ({ cardId, subscriptionId }: PaymentMethodDetailProps) => {
	const { paymentMethodDetail } = usePersistMypageStore();
	const cardDetail = paymentMethodDetail?.subscribeCardDto;
	const paymentMethod = paymentMethodDetail?.paymentMethod;

	const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

	const { data: subscriptionDetail } = useGetSubscriptionDetail(subscriptionId);
	const { mutate } = useDeletePaymentMethod();
	const goBack = useBackNavigation();

	const paymentMethods = Object.entries(PAYMENT).map(([key, value]) => ({ label: value, value: key as PaymentMethod }));
	const cancelSubscription = subscriptionDetail.subscribeStatus === 'SUBSCRIBE_WILL_CANCEL' || subscriptionDetail.subscribeStatus === 'SUBSCRIBE_CANCEL';

	const { addToast } = useToastStore();
	const { isOpen: isOpenChangeCard, onToggle: onIsOpenChangeCardToggle, onClose: onIsOpenChangeCardClose } = useModal();
	const { onToggle, isSelected } = useToggleOption<PaymentMethod | null>(
		selectedPayment,
		"radio",
		setSelectedPayment
	);

	const handleChangeOrDeleteCard = () => {
		if (!cancelSubscription){
			onIsOpenChangeCardToggle();
		} else {
			console.log('handleDelete')

			mutate(
				cardId,
				{
					onSuccess: () => {
						addToast('카드 삭제가 완료되었습니다.', 'above-button');
						setTimeout(() => {
							goBack();
						}, 200);
					},
					onError: (error) => {
						console.log(error);
					}
				}
			)
		}
	}
	
	const handleChangePaymentMethod = () => {
		addToast('카드 변경이 완료되었습니다.', 'above-button');
	}

	const handleCloseModal = () => {
		onIsOpenChangeCardClose();
		setSelectedPayment(null);
		addToast('카드 변경이 취소되었습니다.', 'above-button');
	}

	return (
		<section>
			<article className={styles.billingPreferencesBox}>
				<PaymentCard
					paymentMethod={paymentMethod as PaymentMethod}
					cardName={cardDetail?.cardName || undefined}
					cardNumber={cardDetail?.cardNumber || undefined}
				/>
			</article>
			<article className={styles.detailSubscription}>
				<div className={styles.detailSubscriptionTitle}>
					<Text type='title4'>관리중 구독상품</Text>
				</div>
				<div className={styles.detailSubscriptionList}>
					<SubscriptionCard
						data={subscriptionDetail}
						type='subscriptionDetail'
						showBoxShadow={false}
						showActions={false}
						className={styles.detailSubscriptionCard}
					/>
					{cancelSubscription &&
						<Button type='assistive' variant='outline' size='lg' fullWidth>
							식단 재구독
						</Button>
					}
					<ButtonDocked
						type='full-button'
						onPrimaryClick={handleChangeOrDeleteCard}
						primaryButtonLabel={`결제정보${cancelSubscription ? '삭제' : '변경'}`}
						primaryButtonVariant='outline'
					/>
				</div>
			</article>
			{isOpenChangeCard &&
				<BottomSheet
					title='결제수단'
					isOpen={isOpenChangeCard}
					onClose={handleCloseModal}
					closeOnBackgroundClick={false}
				>
					<div>
						{paymentMethods.map(method => (
							<Button
								key={method.value}
								variant='outline'
								type='assistive'
								fullWidth
								buttonType='button'
								onClick={(e) => e.preventDefault()}
								size='lg'
							>
								<LabeledCheckbox
									value={method.value}
									isChecked={isSelected(method.value)}
									onToggle={onToggle}
									iconType='circle'
								>
									<Text type="label2">
										{method.label}
									</Text>
								</LabeledCheckbox>
							</Button>
						))}
					</div>
					<ButtonDocked
						type='dual-button'
						primaryButtonLabel='확인'
						onPrimaryClick={handleChangePaymentMethod}
						secondaryButtonLabel='취소'
						onSecondaryClick={handleCloseModal}
						isPrimaryDisabled={selectedPayment === null}
					/>
				</BottomSheet>

			}
		</section>
	);
};

export default PaymentMethodDetail;