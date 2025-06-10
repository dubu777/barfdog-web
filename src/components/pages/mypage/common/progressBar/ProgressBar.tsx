import * as styles from './ProgressBar.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Indicator from '/public/images/mypage/progress-indicator.svg';

interface ProgressBarProps {
	progress: number;
	label?: string;
	className?: string;
}
const ProgressBar = ({ progress, label, className }: ProgressBarProps) => {
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
					<DefaultText type='caption'>
						{label}
					</DefaultText>
				</div>
				</>
			}
		</div>
	);
};

export default ProgressBar;