import { ComponentType, ReactNode, SVGProps } from "react";
import * as styles from './InfoBox.css';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface DualInfoBoxProps {
	label: string;
	content: ReactNode;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const InfoBox = ({
	label,
	content,
	icon,
}: DualInfoBoxProps) => {
	return (
		<div className={styles.infoBox}>
			<div className={styles.infoContent}>
				<SvgIcon src={icon} size={20} />
				<DefaultText type='body3'>{label}</DefaultText>
			</div>
			<div className={styles.infoContent}>
				{content}
			</div>
		</div>
	);
};

export default InfoBox;