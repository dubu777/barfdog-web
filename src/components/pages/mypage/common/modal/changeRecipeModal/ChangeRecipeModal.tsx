import { Fragment, useState } from "react";
import * as styles from './ChangeRecipeModal.css';
import { pointColor } from "@/styles/common.css";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/hooks/useModal";
import ChangeBottomSheet
from "@/components/pages/mypage/common/modal/changeRecipeModal/changeBottomSheet/ChangeBottomSheet";
import { numberOfPacksPerDay, subscriptionPlanInfo } from "@/constants";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";

interface ChangeRecipeModalProps {
	subscriptionId: number;
	isOpen: boolean;
	onClose: () => void;
}

const ChangeRecipeModal = ({
	subscriptionId,
	isOpen,
	onClose,
}: ChangeRecipeModalProps) => {
	const { data: detail } = useGetSubscriptionDetail(subscriptionId);

	const [selectedInfo, setSelectedInfo] = useState({
		plan: detail.plan,
		weeklyPaymentCycle: 2,
	})

	const nextCycle = detail.subscribeCount + 1;
	const planInfo = subscriptionPlanInfo[selectedInfo.plan];
	// const weeklyPaymentCycle = planInfo.weeklyPaymentCycle;

	const { isOpen: changeSubscriptionInfoOpen, onClose: onCloseChangeSubscriptionInfo, onToggle: onToggleChangeSubscriptionInfo } = useModal();
	const { isOpen: cancelChangeNoticeOpen, onClose: onCloseCancelChangeNoticeOpen, onToggle: onToggleCancelChangeNoticeOpen } = useModal();

	const subscriptionInfo = [
		{ label: '식사량', value: numberOfPacksPerDay[planInfo.numberOfPacksPerDay], onClick: onToggleChangeSubscriptionInfo },
		{ label: '배송 주기', value: `${selectedInfo.weeklyPaymentCycle}주`, onClick: onToggleChangeSubscriptionInfo },
	]
	return (
		<FullModalWrapper
			headerTitle='식단 변경'
			isVisible={isOpen}
			handleGoBack={onToggleCancelChangeNoticeOpen}
			handleClose={onClose}
		>
			<div className={styles.changeRecipeContainer}>
				<div className={styles.changeRecipeTitle}>
					<DefaultText type='title3'>아래의 정보 확인 후<br/> 식단 변경을 진행해 주세요</DefaultText>
					<DefaultText type='body3' color='gray500'>
						<span className={pointColor}>식단 변경은 {nextCycle}회차부터 변경돼요</span> (현재: {detail.subscribeCount}회차)
					</DefaultText>
				</div>
				<Card shadow='none' padding={16} className={styles.changeRecipeTopInfo}>
					{subscriptionInfo.map((info, index) => (
						<Fragment key={info.value}>
							<div className={styles.topInfo}>
								<div>
									<DefaultText type='label2'>{info.label}</DefaultText>
									<DefaultText type='headline2' style={{ marginLeft: '8px' }}>{info.value}</DefaultText>
								</div>
								<Button onClick={info.onClick} variant='outline' type='assistive' size='sm'>수정</Button>
							</div>
							{index === 0 &&
								<Divider thickness={2} color='gray200' />
							}
						</Fragment>
					))}
				</Card>
				<Card shadow='none' padding={12} className={styles.changeRecipeBottomInfo}>
					<div className={styles.bottomInfoTitle}>
						<DefaultText type='headline2'>구독 상품</DefaultText>
						<Button variant='outline' type='assistive' size='sm'>수정</Button>
					</div>
					<Divider thickness={2} color='gray900' />
				</Card>
			</div>
			{changeSubscriptionInfoOpen &&
				<ChangeBottomSheet
					isOpen={changeSubscriptionInfoOpen}
					onClose={onCloseChangeSubscriptionInfo}
					selectedInfo={selectedInfo}
					setSelectedInfo={setSelectedInfo}
				/>
			}
			{cancelChangeNoticeOpen &&
				<Modal
					title='구독 수정을 중단하시겠어요?'
					content='나가시면 수정해주신 정보는 저장되지 않아요.'
					isOpen={cancelChangeNoticeOpen}
					onClose={onCloseCancelChangeNoticeOpen}
					onCancel={onCloseCancelChangeNoticeOpen}
					onConfirm={onClose}
					confirmText='나가기'
					cancelText='취소'
				/>
			}
		</FullModalWrapper>
	);
};

export default ChangeRecipeModal;