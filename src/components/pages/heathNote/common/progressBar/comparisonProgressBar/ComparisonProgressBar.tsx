import * as styles from './ComparisonProgressBar.css';
import { ReactNode } from "react";
import Text from "@/components/ui/text/Text";
import Chips from "@/components/ui/chips/Chips";
import { getScoreChangeStatus }  from "@/utils/healthNote/common/getHealthStatus";

interface ComparisonProgressBarProps {
	prevScore: number;
	currentScore: number;
	diffValue?: number;
	barSize?: 'sm' | 'md';
	isCurrentScoreChips?: boolean;
	prevBottomChildren?: ReactNode;
	currentBottomChildren?: ReactNode;
}

export default function ComparisonProgressBar({
	prevScore,
	currentScore,
	diffValue = 10,
	barSize = 'md',
	isCurrentScoreChips = false,
	prevBottomChildren,
	currentBottomChildren,
}: ComparisonProgressBarProps) {
	const diff = currentScore - prevScore;
	const status = getScoreChangeStatus(diff, diffValue);

	const getChipsColor = () => {
		switch (status) {
			case 'downLarge':
			case 'downSmall':
				return 'red';
			case 'same':
				return 'green500';
			case 'upSmall':
			case 'upLarge':
				return 'blue600';
		}
	};

	return (
		<div className={styles.comparisonProgressBarBox}>
			<div className={styles.bars}>
				<div className={styles.barBox}>
					<Text type="label4" color='gray500'>{prevScore}점</Text>
					<div className={`${styles.barBase({ size: barSize })} ${styles.prevBar[status]}`} />
					{prevBottomChildren}
				</div>
				<div className={styles.barBox}>
					<Chips
						color={getChipsColor()}
						variant='solid'
						tailPosition='bottom'
						tailVisible
						borderRadius='lg'
						className={styles.currentChips}
					>
						{!isCurrentScoreChips 
							? status === 'same' 
								? '동일' 
								: `${diff > 0 ? '+' : ''}${diff}점` 
							: `${currentScore}점`}
					</Chips>
					<div className={`${styles.barBase({ size: barSize })} ${styles.currentBar[status]}`} />
					{currentBottomChildren}
				</div>
			</div>
		</div>
	);
};