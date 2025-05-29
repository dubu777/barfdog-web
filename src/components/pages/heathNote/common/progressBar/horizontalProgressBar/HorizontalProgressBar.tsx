import * as styles from './HorizontalProgressBar.css';
import { ComponentType, SVGProps } from "react";
import GoodEmogi from '/public/images/healthNote/good_emoji.svg';
import NormalEmogi from '/public/images/healthNote/normal_emoji.svg';
import WarningEmogi from '/public/images/healthNote/warning_emoji.svg';
import DangerEmogi from '/public/images/healthNote/danger_emogi.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { HEALTH_NOTE_PROGRESS_BAR_COLORS } from "@/constants/style";

interface HealthProgressBarProps {
	score: number;
	showLabel?: boolean;
	showIcon?: boolean;
}

interface HealthStatus {
	label: string;
	color: keyof typeof HEALTH_NOTE_PROGRESS_BAR_COLORS;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const getHealthStatus = (score: number): HealthStatus => {
	if (score >= 90) {
		return { label: '건강해요', color: 'blue500', icon: GoodEmogi };
	} else if (score >= 70) {
		return { label: "양호해요", color: 'green500', icon: NormalEmogi };
	} else if (score >= 40) {
		return { label: "주의가 필요해요", color: 'yellow500', icon: WarningEmogi };
	} else {
		return { label: "위험해요", color: 'red', icon: DangerEmogi };
	}
}

const HorizontalProgressBar = ({
	score = 0,
	showLabel = false,
	showIcon = false,
}: HealthProgressBarProps) => {
	const { label, color, icon } = getHealthStatus(score);
	return (
		<div className={styles.progressBarWrapper}>
			{showLabel &&
				<div className={styles.labelRow}>
					<DefaultText type='headline1' color={color}>{label}</DefaultText>
					<DefaultText type='headline1' color={color}>{score}점</DefaultText>
				</div>
			}
			<div className={styles.barContainer}>
				<div className={styles.bar}>
					<div className={`${styles.barProgress} ${styles.barColorStyle[color]}`} style={{ width: `${score}%`, height: '100%' }}>
						{showIcon &&
							<SvgIcon src={icon} size={28} className={styles.barIcon} style={{ right: 0 }} />
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HorizontalProgressBar;