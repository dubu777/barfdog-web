import * as styles from './TermsCheckbox.css';
import InfoIcon from '/public/images/icons/info-fill.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Divider from "@/components/common/divider/Divider";
import { useToggleOption } from "@/hooks/useToggleOption";
import { COLORS } from "@/constants/style";
import { ORDER_MESSAGE } from "@/constants";

interface Terms {
	agreePrivacy: boolean;
	agreeSubscription: boolean;
}

interface TermsCheckboxProps {
	terms: Terms;
	setTerms: (terms: Terms) => void;
	agreeAll: boolean;
}

const TermsCheckbox = ({
	terms,
	setTerms,
	agreeAll,
}: TermsCheckboxProps) => {
	const { onToggle: onAllToggle, isSelected: isAgreeAll } = useToggleOption(agreeAll, "checkbox", (value) => {
		setTerms({
			agreePrivacy: value,
			agreeSubscription: value,
		});
	});
	const { onToggle: onPrivacyToggle, isSelected: isPrivacySelected } =
		useToggleOption(terms.agreePrivacy, "checkbox", (value) => {
			setTerms({ ...terms, agreePrivacy: value })
		});
	const { onToggle: onSubscriptionToggle, isSelected: isSubscriptionSelected } =
		useToggleOption(terms.agreeSubscription, "checkbox", (value) => {
			setTerms({ ...terms, agreeSubscription: value })
		});
	return (
		<div className={styles.termsBox}>
			<DefaultText type='title4'>이용약관동의</DefaultText>
			<div>
				<LabeledCheckbox
					value={true}
					isChecked={isAgreeAll(true)}
					onToggle={() => onAllToggle(true)}
					className={styles.termCheckbox}
				>
					<div className={styles.agreeAllTerms}>
						<DefaultText type="label2">약관 전체동의</DefaultText>
						<button>
							<DefaultText type="label2" color='red' style={{ textDecorationLine: 'underline', textUnderlinePosition: 'from-font' }}>
								전체보기
							</DefaultText>
						</button>
					</div>
				</LabeledCheckbox>
				{!agreeAll &&
					<div className={styles.termsNotice}>
						<SvgIcon src={InfoIcon} color='red' size={15} />
						<DefaultText type='caption' color='red'>결제 필수 사항에 동의해 주세요</DefaultText>
					</div>
				}
			</div>
			<Divider thickness={2} color='gray300' />
			<div className={styles.termsBottom}>
				<LabeledCheckbox
					value={true}
					isChecked={isPrivacySelected(true)}
					onToggle={() => onPrivacyToggle(true)}
					className={styles.termCheckbox}
				>
					<DefaultText type="label2">
						<span style={{ color: COLORS.red }}>(필수) </span>
						{ORDER_MESSAGE.AGREE_PRIVACY}
					</DefaultText>
				</LabeledCheckbox>
				<LabeledCheckbox
					value={true}
					isChecked={isSubscriptionSelected(true)}
					onToggle={() => onSubscriptionToggle(true)}
					className={styles.termCheckbox}
				>
					<DefaultText type="label2">
						<span style={{ color: COLORS.red }}>(필수) </span>
						{ORDER_MESSAGE.AGREE_SUBSCRIPTION}
					</DefaultText>
				</LabeledCheckbox>
			</div>
		</div>
	);
};

export default TermsCheckbox;