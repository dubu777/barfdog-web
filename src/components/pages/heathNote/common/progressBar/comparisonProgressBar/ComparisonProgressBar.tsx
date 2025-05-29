import * as styles from './ComparisonProgressBar.css';
import { ReactNode } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";

interface ComparisonProgressBarProps {
	prevScore: number;
	currentScore: number;
	diffValue: number;
	barSize?: 'sm' | 'md';
	isCurrentScoreChips?: boolean;
	prevBottomChildren?: ReactNode;
	currentBottomChildren?: ReactNode;
}

type ScoreStatus =
	| 'downLarge'
	| 'downSmall'
	| 'same'
	| 'upSmall'
	| 'upLarge';

const getScoreChangeStatus = (diff: number, diffValue: number): ScoreStatus => {
	if (diff >= diffValue) return 'upLarge';
	if (diff > 0) return 'upSmall';
	if (diff === 0) return 'same';
	if (diff >- diffValue) return 'downSmall';
	return 'downLarge';
};

const ComparisonProgressBar = ({
	prevScore,
	currentScore,
	diffValue = 10,
	barSize = 'md',
	isCurrentScoreChips = false,
	prevBottomChildren,
	currentBottomChildren,
}: ComparisonProgressBarProps) => {
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
					<DefaultText type="label4" color='gray500'>{prevScore}점</DefaultText>
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

export default ComparisonProgressBar;