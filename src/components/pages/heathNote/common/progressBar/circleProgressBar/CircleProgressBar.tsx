import * as styles from './CircleProgressBar.css';
import { ComponentType, SVGProps } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { fontColors } from '@/components/common/defaultText/DefaultText.css';
import { COLORS } from '@/constants/style';

interface CircleProgressBarProps {
	score: number;
	svgImage?: ComponentType<SVGProps<SVGSVGElement>>;
	hasFontColor?: boolean;
}

const getStatusInfo = (score: number) => {
	if (score >= 90) return { label: '건강해요!', color: 'blue400' };
	if (score >= 70) return { label: '양호해요', color: 'green400' };
	if (score >= 40) return { label: '주의가 필요해요', color: 'yellow400',  };
	return { label: '위험해요', color: 'pastelRed' };
};

const circleFullDegree = 360;
const displayDegree = 270;
const radius = 120;
const stroke = 12;

const CircleProgressBar = ({ score, svgImage, hasFontColor }: CircleProgressBarProps) => {
	const { label, color } = getStatusInfo(score);

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
			<DefaultText type='label2' color='gray700' className={styles.centerLabel}>{label}</DefaultText>
			<div className={styles.centerContent}>
				<DefaultText type='display2' color={hasFontColor ? color as keyof typeof fontColors : 'gray700'}>{score}점</DefaultText>
				{svgImage &&
					<SvgIcon src={svgImage} size={100} color={color as keyof typeof COLORS} />
				}
				<DefaultText type='headline4' color='gray700' className={styles.leftLabel}>0</DefaultText>
				<DefaultText type='headline4' color='gray700' className={styles.rightLabel}>100</DefaultText>
			</div>
		</div>
	);
};

export default CircleProgressBar;