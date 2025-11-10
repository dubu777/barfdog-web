import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import { RewardInfo } from "@/types";

interface RewardItemProps {
	reward: RewardInfo;
	isLastItem: boolean;
}

export default function RewardItem({
	reward,
	isLastItem = false,
}: RewardItemProps) {
	return (
		<>
			<div
				className={commonWrapper({
					direction: 'col',
					align: 'start',
					gap: 16,
					paddingY: 12,
					paddingX: 20,
					backgroundColors: 'gray0',
				})}
			>
				<Text type='label3'>
					{format(new Date(reward.createdDate), 'yyyy.MM.dd')}
				</Text>
				<div className={commonWrapper({ align: 'start', justify: 'between' })}>
					<Text type='label4'>{reward.name}</Text>
					<Text type='label4' color={reward.rewardStatus === 'USED' ? 'gray500' : 'red'}>
						{reward.rewardStatus === 'USED' ? '-' : '+'}{reward.rewardAmount.toLocaleString()} P
					</Text>
				</div>
			</div>
			{!isLastItem &&
				<Divider thickness={2} color='gray50' />
			}
		</>
	);
}