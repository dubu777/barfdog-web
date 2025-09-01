import * as styles from './TermsCheckbox.css';
import InfoIcon from '/public/images/icons/info-fill.svg';
import Text from "@/components/common/text/Text";
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
			<Text type='title4'>이용약관동의</Text>
			<div>
				<LabeledCheckbox
					value={true}
					isChecked={isAgreeAll(true)}
					onToggle={() => onAllToggle(true)}
					className={styles.termCheckbox}
				>
					<div className={styles.agreeAllTerms}>
						<Text type="label2">약관 전체동의</Text>
						<button>
							<Text type="label2" color='red' style={{ textDecorationLine: 'underline', textUnderlinePosition: 'from-font' }}>
								전체보기
							</Text>
						</button>
					</div>
				</LabeledCheckbox>
				{!agreeAll &&
					<div className={styles.termsNotice}>
						<SvgIcon src={InfoIcon} color='red' size={15} />
						<Text type='caption' color='red'>결제 필수 사항에 동의해 주세요</Text>
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
					<Text type="label2">
						<span style={{ color: COLORS.red }}>(필수) </span>
						{ORDER_MESSAGE.AGREE_PRIVACY}
					</Text>
				</LabeledCheckbox>
				<LabeledCheckbox
					value={true}
					isChecked={isSubscriptionSelected(true)}
					onToggle={() => onSubscriptionToggle(true)}
					className={styles.termCheckbox}
				>
					<Text type="label2">
						<span style={{ color: COLORS.red }}>(필수) </span>
						{ORDER_MESSAGE.AGREE_SUBSCRIPTION}
					</Text>
				</LabeledCheckbox>
			</div>
		</div>
	);
};

export default TermsCheckbox;