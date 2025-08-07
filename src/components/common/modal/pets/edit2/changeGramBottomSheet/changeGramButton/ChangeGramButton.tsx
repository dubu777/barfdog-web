import * as styles from './ChangeGramButton.css';
import { ComponentClass, SVGProps } from "react";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Card from "@/components/common/card/Card";

interface ChangeGramButtonProps {
	isChecked: boolean;
	value: boolean;
	onToggle: () => void;
	title: string;
	subTitle: string;
	svgIcon: ComponentClass<SVGProps<SVGSVGElement>>;
	svgWidth: number;
	svgHeight: number;
}

const ChangeGramButton = ({
	isChecked,
	value,
	onToggle,
	title,
	subTitle,
	svgIcon,
	svgWidth,
	svgHeight,
}: ChangeGramButtonProps) => {
	return (
		<Card shadow='light' padding={16} className={styles.changeGramButtonWrapper({ isChecked })}>
			<LabeledRadioButton
				value={value}
				isChecked={isChecked}
				onToggle={onToggle}
				className={styles.changeGramButton}
			>
				<DefaultText type='headline2' color={isChecked ? 'red' : 'gray900'}>{title}</DefaultText>
				<DefaultText type='body3' preLine>{subTitle}</DefaultText>
				<SvgIcon src={svgIcon} width={svgWidth} height={svgHeight} color={isChecked? 'red' : 'gray300'} className={styles.changeGramIcon} />
			</LabeledRadioButton>
		</Card>
	);
};

export default ChangeGramButton;