import * as styles from './EmptyState.css';
import DefaultText from "@/components/common/defaultText/DefaultText";

interface EmptyStateProps {
	title: string;
	subTitle?: string;
}
const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
	return (
		<div className={styles.emptyStateContainer}>
			<DefaultText type='label1' color='gray700' align='center'>
				{title}
			</DefaultText>
			{subTitle &&
				<DefaultText type='body3' color='gray600' align='center'>
					{subTitle}
				</DefaultText>
			}
		</div>
	);
};

export default EmptyState;