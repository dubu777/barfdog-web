import * as styles from './ProgressBar.css';
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Indicator from '/public/images/mypage/progress-indicator.svg';

interface ProgressBarProps {
	progress: number;
	label?: string;
	className?: string;
}
export default function ProgressBar({ progress, label, className }: ProgressBarProps) {
	return (
		<div className={`${styles.progressBarContainer} ${className || ''}`}>
			<div
				style={{ width: `${progress}%` }}
				className={styles.progressActive}
			/>
			{label &&
				<>
				<SvgIcon src={Indicator} size={13} style={{ left: `${progress}%` }} className={styles.progressIndicator} />
				<div
					style={{ left: `${progress}%` }}
					className={styles.progressLabel}
				>
					<Text type='caption'>
						{label}
					</Text>
				</div>
				</>
			}
		</div>
	);
};