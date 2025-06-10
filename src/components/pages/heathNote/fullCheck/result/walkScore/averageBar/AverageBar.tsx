import * as styles from './AverageBar.css';
import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { CHIPS_COLORS, COLORS, HEALTH_NOTE_PROGRESS_BAR_COLORS } from "@/constants/style";

interface AverageBarProps {
	label: string;
	value: number;
	color: 'gray300' | 'blue400' | 'pastelRed';
	showChips?: boolean;
}

function getBarHeightByHour(hour: number): number {
	const MIN_HOUR = 1;
	const MAX_HOUR = 24;
	const MIN_HEIGHT = 11;
	const MAX_HEIGHT = 132;

	const ratio = (hour - MIN_HOUR) / (MAX_HOUR - MIN_HOUR); // 0 ~ 1 사이 비율
	return Math.round(MIN_HEIGHT + ratio * (MAX_HEIGHT - MIN_HEIGHT));
}

const AverageBar = ({ label, value, color, showChips = false }: AverageBarProps) => {
	const height = getBarHeightByHour(value);
	return (
		<div className={styles.barBox}>
			{showChips ? (
				<Chips className={styles.barChips} variant='solid' color='blue600' tailPosition='bottom' tailVisible borderRadius='lg'>
					{value}시간
				</Chips>
			) : (
				<DefaultText type='label4' color='gray600'>{value}시간</DefaultText>
			)}
			<div className={styles.bar({ color })} style={{ height: height }} />
			<DefaultText type='label4' color={showChips ? 'gray900' : 'gray600'}>{label}</DefaultText>
		</div>
	)
};

export default AverageBar;