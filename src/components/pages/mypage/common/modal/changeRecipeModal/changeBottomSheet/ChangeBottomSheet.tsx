import { useState } from "react";
import * as styles from './ChangeBottomSheet.css';
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { numberOfPacksPerDay, subscriptionPlanInfo } from "@/constants";
import { PlanKey } from "@/types";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";

interface SelectedInfo {
	plan: PlanKey;
	weeklyPaymentCycle: number;
}

interface ChangeBottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	selectedInfo: SelectedInfo;
	setSelectedInfo: (selectedInfo: SelectedInfo) => void;
}

const ChangeBottomSheet = ({
	isOpen,
	onClose,
	selectedInfo,
	setSelectedInfo,
}: ChangeBottomSheetProps) => {
	const [tempSelectedInfo, setTempSelectedInfo] = useState(selectedInfo);

	const subscriptionInfo = [
		{
			key: 'plan',
			label: '식사량',
			items: [
				{
					label: numberOfPacksPerDay[subscriptionPlanInfo.HALF.numberOfPacksPerDay],
					value: subscriptionPlanInfo.HALF.id,
					isChecked: tempSelectedInfo.plan === subscriptionPlanInfo.HALF.id,
					showItem: true,
					chipText: '3%',
				},
				{
					label: numberOfPacksPerDay[subscriptionPlanInfo.FULL.numberOfPacksPerDay],
					value: subscriptionPlanInfo.FULL.id,
					isChecked: tempSelectedInfo.plan === subscriptionPlanInfo.FULL.id,
					showItem: true,
					chipText: '5%',
				},
			],
		},
		{
			key: 'weeklyPaymentCycle',
			label: '배송 주기',
			items: [
				{
					label: '2주',
					value: 2,
					isChecked: tempSelectedInfo.weeklyPaymentCycle === 2,
					showItem: true,
				},
				{
					label: '4주',
					value: 4,
					isChecked: tempSelectedInfo.weeklyPaymentCycle === 4,
					showItem: tempSelectedInfo.plan === subscriptionPlanInfo.FULL.id,
				},
			],
		}
	]

	const handleChangeSubscriptionInfo = () => {
		setSelectedInfo(tempSelectedInfo);
		onClose();
	}

	return (
		isOpen &&
		<BottomSheet
			title='구독 정보 수정'
			isOpen={isOpen}
			onClose={onClose}
			closeOnBackgroundClick

		>
			<div className={styles.changeSubscriptionInfo}>
				{subscriptionInfo.map(category => (
					<div key={category.label} className={styles.subscriptionInfoItem}>
						<DefaultText type='label2'>{category.label}</DefaultText>
						<div className={styles.selectBox}>
							{category.items.map(item => {
								const handleChange = () => {
									if (category.key === 'plan' && item.value === subscriptionPlanInfo.HALF.id) {
										setTempSelectedInfo({ [category.key]: item.value, weeklyPaymentCycle: 2 })
									} else {
										setTempSelectedInfo({...tempSelectedInfo, [category.key]: item.value});
									}
								}
								return (
									item.showItem &&
									<SurveyButton
										key={item.value}
										value={item.value}
										isChecked={item.isChecked}
										label={item.label}
										onToggle={handleChange}
										chipText={item.chipText || undefined}
									/>
								)
							})}
						</div>
					</div>
				))}
			</div>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='완료'
				onPrimaryClick={handleChangeSubscriptionInfo}
			/>
		</BottomSheet>
	);
};

export default ChangeBottomSheet;