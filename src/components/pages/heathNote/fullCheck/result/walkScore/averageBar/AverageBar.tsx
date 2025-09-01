import * as styles from './AverageBar.css';
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";

function getBarHeightByHour(hour: number, maxValue: number): number {
	const MIN_HEIGHT = 11;
	const MAX_HEIGHT = 132;

	if (maxValue === 0) return MIN_HEIGHT;

	const ratio = hour / maxValue; // 0 ~ 1 사이 비율
	return Math.round(MIN_HEIGHT + ratio * (MAX_HEIGHT - MIN_HEIGHT));
}

interface AverageBarProps {
	label: string;
	value: number;
	maxValue: number;
	color: 'gray300' | 'blue400' | 'pastelRed';
	showChips?: boolean;
}

export default function AverageBar ({
	label,
	value,
	maxValue,
	color,
	showChips = false
}: AverageBarProps) {
	const height = getBarHeightByHour(value, maxValue);
	return (
		<div className={styles.barBox}>
			{showChips ? (
				<Chips className={styles.barChips} variant='solid' color='blue600' tailPosition='bottom' tailVisible borderRadius='lg'>
					{value}시간
				</Chips>
			) : (
				<Text type='label4' color='gray600'>{value}시간</Text>
			)}
			<div className={styles.bar({ color })} style={{ height: height }} />
			<Text type='label4' color={showChips ? 'gray900' : 'gray600'}>{label}</Text>
		</div>
	)
};