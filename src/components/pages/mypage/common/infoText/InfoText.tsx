import * as styles from './InfoText.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { fontColors, textStyles } from "@/components/common/defaultText/DefaultText.css";

interface InfoTextProps {
	text: string;
	color?: keyof typeof fontColors;
	type?: keyof typeof textStyles;
}

const InfoText = ({ text, color = 'gray500', type = 'caption' }: InfoTextProps) => {
	return (
		<div className={styles.infoTextBox}>
			<DefaultText type={type} color={color}>• </DefaultText>
			<DefaultText type={type} color={color}>{text}</DefaultText>
		</div>
	);
};

export default InfoText;