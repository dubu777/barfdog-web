import { commonWrapper } from '@/styles/common.css';
import Text from "@/components/common/text/Text";

interface EmptyStateProps {
	title: string;
	subTitle?: string;
}

export default function EmptyState({ title, subTitle }: EmptyStateProps) {
	return (
		<div className={commonWrapper({
			gap: 4,
			align: 'start',
			paddingTop: 60,
			paddingBottom: 60,
		})}>
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