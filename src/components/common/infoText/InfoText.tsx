import { ReactNode } from "react";
import * as styles from './InfoText.css';
import Text from "@/components/common/text/Text";
import { fontColors, textStyles } from "@/components/common/text/Text.css";

interface InfoTextProps {
	text?: string;
	color?: keyof typeof fontColors;
	type?: keyof typeof textStyles;
	children?: ReactNode;
}

const InfoText = ({ text, color = 'gray500', type = 'caption', children }: InfoTextProps) => {
	return (
		<div className={styles.infoTextBox}>
			<Text type={type} color={color}>• </Text>
			{children
				? children
				: <Text type={type} color={color}>{text}</Text>
			}
		</div>
	);
};

export default InfoText;