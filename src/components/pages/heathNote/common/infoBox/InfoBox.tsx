import { ComponentType, ReactNode, SVGProps } from "react";
import * as styles from './InfoBox.css';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";

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
				<DefaultText type='body3'>{label}</DefaultText>
			</div>
			<div className={`${styles.infoContent} ${align === 'start' ? styles.infoContentAlignStart : ''}`}>
				{content}
			</div>
		</div>
	);
};