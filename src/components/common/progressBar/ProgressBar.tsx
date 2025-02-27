import * as styles from './ProgressBar.css';
import DefaultText from "@/components/common/defaultText/DefaultText";

interface ProgressBarProps {
	progress: number;
	label: string;
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
	return (
		<div className={styles.progressBarContainer}>
			<div
				style={{ width: `${progress}%` }}
				className={styles.progressActive({ progress: progress as 0 || 100 })}
			/>
			{label &&
				<div
					style={{ left: `${progress}%` }}
					className={styles.progressLabel}
				>
					<DefaultText type='caption'>
						{label}
					</DefaultText>
				</div>
			}
		</div>
	);
};

export default ProgressBar;