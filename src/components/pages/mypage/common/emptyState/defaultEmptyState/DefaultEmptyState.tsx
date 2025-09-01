import * as styles from './DefaultEmptyState.css';
import Text from "@/components/common/text/Text";

interface EmptyStateProps {
	title: string;
	subTitle?: string;
}

export default function DefaultEmptyState({ title, subTitle }: EmptyStateProps) {
	return (
		<div className={styles.emptyStateContainer}>
			<Text type='label1' color='gray700' align='center'>
				{title}
			</Text>
			{subTitle &&
				<Text type='body3' color='gray600' align='center'>
					{subTitle}
				</Text>
			}
		</div>
	);
};