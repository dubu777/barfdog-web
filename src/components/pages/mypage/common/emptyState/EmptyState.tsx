import { commonWrapper } from '@/styles/common.css';
import Text from "@/components/ui/text/Text";

interface EmptyStateProps {
	title: string;
	subTitle?: string;
}

export default function EmptyState({ title, subTitle }: EmptyStateProps) {
	return (
		<div className={commonWrapper({
			direction: 'col',
			gap: 4,
			paddingY: 60,
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