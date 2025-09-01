import { ComponentType, ReactNode, SVGProps } from "react";
import * as styles from './InfoBox.css';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";

interface DualInfoBoxProps {
	label: string;
	content: ReactNode;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	align?: 'center' | 'start';
}

export default function InfoBox({
	label,
	content,
	icon,
	align = 'center'
}: DualInfoBoxProps) {
	return (
		<div className={styles.infoBox({ align })}>
			<div className={styles.infoContent}>
				<SvgIcon src={icon} size={20} />
				<Text type='body3'>{label}</Text>
			</div>
			<div className={`${styles.infoContent} ${align === 'start' ? styles.infoContentAlignStart : ''}`}>
				{content}
			</div>
		</div>
	);
};