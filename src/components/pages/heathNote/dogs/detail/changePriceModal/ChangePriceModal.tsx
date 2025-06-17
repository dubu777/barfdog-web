import * as styles from './ChangePriceModal.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InfoBox from "@/components/common/infoBox/InfoBox";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import CompletedBox from "@/components/common/completedBox/CompletedBox";
import { useBackNavigation } from "@/utils";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { useToastStore } from "@/store/useToastStore";

interface ChangePriceModalProps {
	isOpen: boolean;
	onClose: () => void;
	handleSubmit: () => void;
	subscriptionId: number;
}

const ChangePriceModal = ({
	isOpen,
	onClose,
	handleSubmit,
	subscriptionId,
}: ChangePriceModalProps) => {
	const router = useRouter();
	const goBack = useBackNavigation(undefined, true);

	const [confirmed, setConfirmed] = useState(false);

	const { completedMode, enableCompletedMode } = useCompletedMode();
	const { addToast } = useToastStore();

	const isBeforePaying = false;
	const paymentInfo = [
		{
			label: '기존 결제 금액',
			value: 77328,
		},
		{
			label: '변경 결제 금액',
			value: 76003,
		},
	]

	const handleGoToSubscriptionDetail = () => {
		router.push(`/mypage/subscription/${subscriptionId}`);
	}

	const handleCompletedMode = () => {
		enableCompletedMode();
		handleSubmit();
	}

	const handleFinalClose = () => {
		onClose();
		goBack();
		addToast('프로필 수정이 완료됐어요', 'above-button');
	}
	return (
		<FullModalWrapper
			isVisible={isOpen}
			handleGoBack={!completedMode ? onClose : undefined}
			handleClose={completedMode ? handleFinalClose : undefined}
			headerTitle={!completedMode ? '결제 금액 변경' : ' '}
		>
			{!completedMode ? (
				<>
					<div className={styles.changePriceTitle}>
						<DefaultText type='title3'>식단을 변경하면<br/>결제 금액이 달라져요, 진행할까요?</DefaultText>
						<DefaultText type='body2' color='red'>N회차부터 급여량과 결제 금액이 변경돼요</DefaultText>
						{!isBeforePaying &&
						<DefaultText type='body3' color='gray500'>(현재: N회차)</DefaultText>
						}
					</div>
					<div className={styles.changePriceContent}>
						<DefaultText type='title4'>결제 정보</DefaultText>
						<Divider thickness={2} color='gray900' style={{ marginTop: '12px' }} />
						<div className={styles.changePriceInfoBox}>
							{paymentInfo.map((info, index) => (
								<>
									<div key={info.label} className={styles.changePriceInfo}>
										<DefaultText type='label2' color='gray700'>{info.label}</DefaultText>
										<DefaultText type='headline2'>{info.value.toLocaleString()}원</DefaultText>
									</div>
									{index === 0 && <Divider thickness={1} color='gray200' />}
								</>
							))}
						</div>
						<InfoBox text='쿠폰 적용 전 기준 금액이며, 실제 결제 금액과는 다를 수 있어요.' color='gray' />
						<LabeledCheckbox
							value={confirmed}
							isChecked={confirmed}
							onToggle={() => setConfirmed(!confirmed)}
							className={styles.changePriceConfirm}
						>
							<div className={styles.changePriceConfirmText}>
								<DefaultText type='label2' color='red' className={styles.changePriceConfirmTextPoint}>(필수)</DefaultText>
								<DefaultText type='label2'>위 내용을 확인하였으며, 변경된 금액으로의 정기 결제에 동의합니다.</DefaultText>
							</div>
						</LabeledCheckbox>
					</div>
					<ButtonDocked
						type='full-button'
						primaryButtonLabel='변경 완료'
						onPrimaryClick={handleCompletedMode}
						isPrimaryDisabled={!confirmed}
					/>
				</>
			) : (
				<div className={styles.ChangePriceCompletedBox}>
					<CompletedBox>
						<DefaultText type='title2'>급여량과 결제 금액<br/>변경이 완료됐습니다</DefaultText>
						<DefaultText type='body3' color='gray600'>자세한 내역은 구독 관리에서 확인해 주세요</DefaultText>
					</CompletedBox>
					<ButtonDocked
						type='dual-button'
						secondaryButtonLabel='구독 상세'
						onSecondaryClick={handleGoToSubscriptionDetail}
						primaryButtonLabel='확인'
						onPrimaryClick={handleFinalClose}
					/>
				</div>
			)}

		</FullModalWrapper>
	);
};

export default ChangePriceModal;