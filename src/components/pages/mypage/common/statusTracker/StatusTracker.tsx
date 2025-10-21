import * as styles from './StatusTracker.css';
import Text from "@/components/common/text/Text";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowRightIcon from '/public/images/icons/chevron-right-blue.svg';

interface StatusStep {
	key: string;
	label: string;
	count?: number | string;
	isActive?: boolean;
}

interface StatusTrackerProps {
	statusTitle: string;
	steps: StatusStep[];
}

export default function StatusTracker({ statusTitle, steps }: StatusTrackerProps) {
	const lastActiveIndex = steps?.findIndex(step => step.isActive);
	const updatedSteps = steps?.map((step, index) => ({
		...step,
		isActive: index <= lastActiveIndex,
	}));
	return (
		<article className={styles.statusTrackerContainer}>
			<Text type='headline1' className={styles.statusTracker}>{statusTitle}</Text>
			<div className={styles.statusTrackerStepBox}>
				{updatedSteps?.map((step, index) => (
					<>
						<div key={step.key} className={styles.statusTrackerStepInfo}>
							{step.count !== undefined &&
							<Text type='label1' color='gray700'>{step.count}</Text>
							}
							<Text
								type='caption'
								color={step.isActive === undefined ? 'gray700' : step.isActive ? 'red' : 'gray300'}
								align='center'
								className={styles.statusTrackerLabel}
							>
								{step.label}
							</Text>
						</div>
						{index < steps.length - 1 && <SvgIcon src={ArrowRightIcon} size={20} color={step.isActive ? 'red' : 'gray300'} /> }
					</>
				))}
			</div>
		</article>
	);
};