import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import MetaText from "@/components/pages/mypage/common/card/typography/MetaText";
import { formatDate } from "@/utils";
import { RewardData } from "@/types";

interface RewardItemProps {
	reward: RewardData;
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
					padding: '12/20',
					backgroundColors: 'gray0',
				})}
			>
				<Text type='label3'>
					{formatDate(reward.createdTime, 'onlyDateDot')}
				</Text>
				<div className={commonWrapper({ align: 'start', justify: 'between' })}>
					<div className={commonWrapper({ direction: 'col', align: 'start', gap: 4, width: 'auto' })}>
						<Text type='label4'>{reward.name}</Text>
						<MetaText
							leftText={`${format(new Date(reward.createdTime), 'yyyy.MM.dd')} 까지 사용 가능`}
							type='caption2'
						/>
					</div>
					<Text type='label4' color={reward.rewardStatus === 'USED' ? 'gray500' : 'red'}>
						{reward.rewardStatus === 'USED' ? '-' : '+'}{reward.tradeReward.toLocaleString()} P
					</Text>
				</div>
			</div>
			{!isLastItem &&
				<Divider thickness={2} color='gray50' />
			}
		</>
	);
}