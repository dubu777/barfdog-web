import * as styles from './ChangedScore.css';
import GoodEmogi from '/public/images/healthNote/good_emoji.svg';
import DangerEmogi from '/public/images/healthNote/danger_emogi.svg';
import SameEmogi from '/public/images/healthNote/same_emoji.svg';
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import ComparisonProgressBar
	from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";
import { useScoreStatus } from "@/hooks/healthNote/useScoreStatus";

interface ScoreInfoProps {
	date: string;
	checkupScore: number;
	isCurrent?: boolean;
}

interface ChangedScoreProps {
	checkupScore: number;
	scoreDifference: number;
	previousDiagnosisDate: string;
	diagnosisDate: string;
}

const STATUS_MESSAGE = {
	same: {
		title: '이전 점수와 동일해요!',
		description: '건강 상태가 이전과 동일하네요! 우리 아이의 건강한 삶을 위해 꾸준하게 관리해 주세요',
		icon: SameEmogi,
	},
	up: {
		title: '올랐어요!',
		description: '이전보다 건강 상태가 좋아졌어요! 우리 아이가 건강을 잘 유지할 수 있도록 지금처럼 관리해 주세요',
		icon: GoodEmogi,
	},
	down: {
		title: '떨어졌어요!',
		description: '이전보다 관리가 필요한 상태예요! 우리 아이의 건강을 위해 지속적으로 살펴봐 주세요',
		icon: DangerEmogi,
	},
}
export default function ChangedScore({
	checkupScore,
	scoreDifference,
	previousDiagnosisDate,
	diagnosisDate,
}: ChangedScoreProps) {
	const { prev: prevScore, status } = useScoreStatus({ current: checkupScore, scoreDifference: scoreDifference });
	return (
		<article>
			<ResultCard
				className={styles.changedScoreContainer}
				title={`건강 종합 점수가\n${status !== 'same' ? `이전보다 ${Math.abs(scoreDifference)}점 ` : ''}${STATUS_MESSAGE[status].title}`}
			>
				<Card
					shadow='none'
					direction='row'
					padding={12}
					gap={12}
					className={styles.changedScoreNotice}
				>
					<SvgIcon src={STATUS_MESSAGE[status].icon} />
					<Text type='label4' color='gray700'>
						{STATUS_MESSAGE[status].description}
					</Text>
				</Card>
				<ComparisonProgressBar
					prevScore={prevScore}
					currentScore={checkupScore}
					prevBottomChildren={(
						<ScoreInfo date={previousDiagnosisDate} checkupScore={prevScore} />
					)}
					currentBottomChildren={
						<ScoreInfo date={diagnosisDate} checkupScore={checkupScore} />
					}
				/>
			</ResultCard>
		</article>
	);
};

const ScoreInfo = ({ date, checkupScore, isCurrent = false }: ScoreInfoProps) => (
	<div className={styles.scoreInfo}>
		<Text type='body3' color='gray600'>
			{date}
		</Text>
		<Text type='headline2' color={!isCurrent ? 'gray600' : 'gray900'}>
			{checkupScore}점
		</Text>
	</div>
)