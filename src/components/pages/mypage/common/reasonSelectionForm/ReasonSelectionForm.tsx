import * as styles from './ReasonSelectionForm.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import DefaultTextarea from "@/components/common/defaultTextarea/DefaultTextarea";

interface ReasonSelectionFormProps {
	title: string;
	subTitle: string;
	reasons: {
		id: string;
		label: string;
	}[];
	selectedReasons: string[];
	setSelectedReasons: (selectedReasons: string[]) => void;
	otherReason?: string;
	setOtherReason?: (otherReason: string) => void;
	confirmButtonText: string;
	onConfirm: () => void;
	onCancel: () => void;
	textareaPlaceholder?: string;
}

const ReasonSelectionForm = ({
	title,
	subTitle,
	reasons,
	selectedReasons = [],
	setSelectedReasons,
	otherReason = '',
	setOtherReason,
	confirmButtonText,
	onConfirm,
	onCancel,
	textareaPlaceholder = '',
}: ReasonSelectionFormProps) => {
	const handleToggle = (id: string, checked: boolean) => {
		if (id === 'other') {
			if(setOtherReason) {
				setOtherReason('');
			}
		}
		const updatedValues = checked
			? [...selectedReasons, id]
			: selectedReasons.filter(value => value !== id);

		setSelectedReasons(updatedValues);
	};
	return (
		<>
			<div className={styles.reasonSelectionTitle}>
				<DefaultText type='title3'>{title}</DefaultText>
				<DefaultText type='body1' color='gray600' preLine>{subTitle}</DefaultText>
			</div>
			<ul className={styles.reasonCheckboxList}>
				{reasons.map(reason => (
					<li key={reason.id}>
						<DefaultCheckbox
							id={reason.id}
							name={reason.id}
							value={selectedReasons.includes(reason.id)}
							label={reason.label}
							onChange={(checked) => handleToggle(reason.id, checked as boolean)}
						/>
						{selectedReasons.includes('other') && reason.id === 'other' &&
							<DefaultTextarea
								id='otherReason'
								value={otherReason}
								placeholder={textareaPlaceholder || '기타 사항을 입력해주세요 (선택)'}
								minLength={0}
								maxLength={1000}
								onChange={(e) => setOtherReason ? setOtherReason(e.target.value) : undefined}
								className={styles.otherReasonTextarea}
							/>
						}
					</li>
				))}
			</ul>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='돌아가기'
				onSecondaryClick={onCancel}
				primaryButtonLabel={confirmButtonText}
				onPrimaryClick={onConfirm}
				isPrimaryDisabled={selectedReasons.length === 0}
			/>
		</>
	);
};

export default ReasonSelectionForm;