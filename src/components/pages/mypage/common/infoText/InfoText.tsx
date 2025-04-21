import * as styles from './InfoText.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { fontColors } from "@/components/common/defaultText/DefaultText.css";

const InfoText = ({ text, color = 'gray500' }: { text: string, color?: keyof typeof fontColors; }) => {
	return (
		<div className={styles.infoTextBox}>
			<DefaultText type='caption' color={color}>• </DefaultText>
			<DefaultText type='caption' color={color}>{text}</DefaultText>
		</div>
	);
};

export default InfoText;