import * as styles from './CircleProgressBar.css';
import { ComponentType, SVGProps } from "react";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import { fontColors } from '@/components/ui/text/Text.css';
import { COLORS } from '@/constants/style';
import { getSimpleHealthStatus } from "@/utils/healthNote/common/getHealthStatus";

interface CircleProgressBarProps {
	score: number;
	svgImage?: ComponentType<SVGProps<SVGSVGElement>>;
	hasFontColor?: boolean;
}

const circleFullDegree = 360;
const displayDegree = 270;
const radius = 120;
const stroke = 12;

export default function CircleProgressBar({
	score, 
	svgImage, 
	hasFontColor
}: CircleProgressBarProps) {
	const { label, color } = getSimpleHealthStatus(score, '400');

	const normalizedRadius = radius - stroke / 2;
	const circumference = normalizedRadius * 2 * Math.PI;

	const progressLength = (score / 100) * (displayDegree / circleFullDegree) * circumference;
	const strokeDasharray = `${progressLength} ${circumference}`;
	const strokeDashoffset = 0;

	const totalArcLength = (displayDegree / circleFullDegree) * circumference;

	return (
		<div className={styles.circleProgressBox}>
			<svg width="240" height="240" className={styles.svg}>
				<circle
					className={styles.circleBackground}
					strokeWidth={stroke}
					r={normalizedRadius}
					cx="120"
					cy="120"
					strokeDasharray={`${totalArcLength} ${circumference}`}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					transform="rotate(-135 120 120)"
				/>
				<circle
					className={`${styles.circleProgressBase} ${styles.circleProgressColor[color]}`}
					strokeWidth={stroke}
					r={normalizedRadius}
					cx="120"
					cy="120"
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					transform="rotate(-135 120 120)"
				/>
			</svg>
			<Text type='label2' color='gray700' className={styles.centerLabel}>{label}</Text>
			<div className={styles.centerContent}>
				<Text type='display2' color={hasFontColor ? color as keyof typeof fontColors : 'gray700'}>{score}점</Text>
				{svgImage &&
					<SvgIcon src={svgImage} size={100} color={color as keyof typeof COLORS} />
				}
				<Text type='headline4' color='gray700' className={styles.leftLabel}>0</Text>
				<Text type='headline4' color='gray700' className={styles.rightLabel}>100</Text>
			</div>
		</div>
	);
};