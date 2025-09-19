import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import InfoBox from "@/components/common/infoBox/InfoBox";
import RewardInfoBottomSheet from "@/components/pages/mypage/reward/list/rewardInfo/rewardInfoBottomSheet/RewardInfoBottomSheet";
import useModal from "@/hooks/useModal";

interface RewardInfoProps {
	totalRewards: number;
}

export default function RewardInfo({
	totalRewards,
}: RewardInfoProps) {

	const { onToggle, onClose, isOpen } = useModal();
	return (
		<article
			className={commonWrapper({
				padding: 20,
				direction: 'col',
				align: 'start',
				gap: 8,
			})}
		>
			<Text type='title4'>적립금</Text>
			<div
				className={commonWrapper({
					direction: 'col',
					align: 'start',
					gap: 12,
				})}
			>
				<Card
					shadow='light'
					padding='16/20'
					align='start'
				>
					<div
						className={commonWrapper({
							direction: 'col',
							align: 'start',
							gap: 4,
						})}
					>
						<Text type='label4'>사용 가능 적립금</Text>
						<Text type='title2'>{totalRewards?.toLocaleString()} P</Text>
					</div>
				</Card>
				<InfoBox text='적립금 안내사항' onClick={onToggle} fullWidth showRightArrowButton />
				{isOpen &&
					<RewardInfoBottomSheet isOpen={isOpen} onClose={onClose} />
				}
			</div>
		</article>
	);
}