import * as styles from './HorizontalProgressBar.css';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getFullHealthStatus } from "@/utils/healthNote/getHealthStatus";

interface HealthProgressBarProps {
	score: number;
	showLabel?: boolean;
	showIcon?: boolean;
}

const HorizontalProgressBar = ({
	score = 0,
	showLabel = false,
	showIcon = false,
}: HealthProgressBarProps) => {
	const { label, color, icon } = getFullHealthStatus(score, '500');
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