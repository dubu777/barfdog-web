import * as styles from './ChangedScore.css';
import GoodEmogi from '/public/images/healthNote/good_emoji.svg';
import DangerEmogi from '/public/images/healthNote/danger_emogi.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import ComparisonProgressBar
	from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";
import { BODY_PART_TO_CATEGORY } from "@/constants";
import { getScoreChangeStatus, getSimplifyStatus } from "@/utils/healthNote/getHealthStatus";

interface ScoreInfoProps {
	date: string;
	score: number;
	isCurrent?: boolean;
}

interface ChangedScoreProps {
	score: number;
	prevScore: number;
	prevDate: string;
	createdDate: string;
	bodyPart: (keyof typeof BODY_PART_TO_CATEGORY)[];
}

const STATUS_MESSAGE = {
	same: {
		title: '이전 점수와 동일해요!',
	},
	up: {
		title: '올랐어요!',
		description: '의 건강 상태가 좋아졌어요!\n우리 아이가 건강을 잘 유지할 수 있도록 지금처럼 관리해 주세요',
		icon: GoodEmogi,
	},
	down: {
		title: '떨어졌어요!',
		description: '에서 관리가 필요한 상태에요!\n우리 아이의 건강을 위해 지속적으로 살펴봐 주세요',
		icon: DangerEmogi,
	},
}

const ChangedScore = ({
	score,
	prevScore,
	prevDate,
	createdDate,
	bodyPart = [],
}: ChangedScoreProps) => {
	const diffScore = score - prevScore;
	const status = getSimplifyStatus(getScoreChangeStatus(diffScore, 10));

	return (
		<article>
			<ResultCard
				className={styles.changedScoreContainer}
				title={`건강 종합 점수가\n${status !== 'same' ? `이전보다 ${Math.abs(diffScore)}점 ` : ''}${STATUS_MESSAGE[status].title}`}
			>
				{status !== 'same' &&
					<Card shadow='none' className={styles.changedScoreNotice}>
						<SvgIcon src={STATUS_MESSAGE[status].icon} />
						<DefaultText type='label4' color='gray700'>
							{bodyPart.map(v => BODY_PART_TO_CATEGORY[v]).join(', ')}
							{STATUS_MESSAGE[status].description}
						</DefaultText>
					</Card>
				}
				<ComparisonProgressBar
					prevScore={prevScore}
					currentScore={score}
					prevBottomChildren={(
						<ScoreInfo date={prevDate} score={prevScore} />
					)}
					currentBottomChildren={
						<ScoreInfo date={createdDate} score={score} />
					}
				/>
			</ResultCard>
		</article>
	);
};

const ScoreInfo = ({ date, score, isCurrent = false }: ScoreInfoProps) => (
	<div className={styles.scoreInfo}>
		<DefaultText type='body3' color='gray600'>
			{date}
		</DefaultText>
		<DefaultText type='headline2' color={!isCurrent ? 'gray600' : 'gray900'}>
			{score}점
		</DefaultText>
	</div>
)

export default ChangedScore;