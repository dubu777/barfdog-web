import * as styles from './InputLabel.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { pointColor } from "@/styles/common.css";

interface InputLabelProps {
	label: string;
	labelColor: 'gray700' | 'gray800';
	isRequired?: boolean
}

const InputLabel = ({
	label,
	labelColor,
	isRequired = false,
}: InputLabelProps) => {
	return (
		<DefaultText type='label4' color={labelColor} className={styles.labelStyle}>
			{label} {isRequired && <span className={pointColor}>*</span>}
		</DefaultText>
	);
};

export default InputLabel;