import * as styles from './WalkScore.css';
import Image from "next/image";
import WalkDogImage from '/public/images/healthNote/full-check/walk-dog.png';
import HistoryIcon from '/public/images/healthNote/full-check/history.svg';
import FootprintIcon from '/public/images/healthNote/full-check/footprint.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import InfoBox from "@/components/pages/heathNote/common/infoBox/InfoBox";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import AverageBar from "@/components/pages/heathNote/fullCheck/result/walkScore/averageBar/AverageBar";
import { DOG_SIZE } from "@/constants/dog";

interface AverageDurations {
	hourByOverall: number;
	hourByPeers: number;
	hourByDogSize: number;
}

interface WalkScoreProps {
	dogName: string;
	dogSize: keyof typeof DOG_SIZE;
	walkRank: number;
	averageCount: number;
	averageDurationHours: number;
	averageDurations: AverageDurations;
}

const WalkScore = ({
	dogName,
	dogSize,
	walkRank,
	averageCount,
	averageDurationHours,
	averageDurations,
}: WalkScoreProps) => {
	const { hourByOverall, hourByPeers, hourByDogSize } = averageDurations;
	const walkInfo = [
		{
			label: '평균 산책 횟수',
			icon: FootprintIcon,
			value: averageCount,
		},
		{
			label: '평균 산책 시간',
			icon: HistoryIcon,
			value: averageDurationHours,
		},
	]

	const averageDurationList = [
		{
			label: '전체평균',
			value: hourByOverall,
			color: 'pastelRed',
		},
		{
			label: '또래',
			value: hourByPeers,
			color: 'gray300',
		},
		{
			label: DOG_SIZE[dogSize],
			value: hourByDogSize,
			color: 'gray300',
		},
		{
			label: dogName,
			value: averageDurationHours,
			color: 'blue400',
			showChips: true,
		},
	]

	return (
		<article>
			<ResultCard
				className={styles.walkScoreContainer}
				title={`${dogName}의\n산책 점수는 어떻게 될까요?`}
				subTitle='일주일 기준으로 점수가 매겨져요'
			>
				<div className={styles.walkScoreContentBox}>
					<Image src={WalkDogImage} alt='walk dog' width={303} height={140} />
					<Card shadow='none' className={styles.walkScoreInfoCard}>
						<div className={styles.walkScore}>
							<DefaultText type='headline2'>{dogName}의 산책 점수</DefaultText>
							<DefaultText type='display1' applyLineHeight>
								<DefaultText type='label4'>상위</DefaultText>
								&nbsp;{walkRank}%
							</DefaultText>
						</div>
						<Divider thickness={1} color='gray100' />
						<div className={styles.walkScoreInfo}>
							{walkInfo.map((info, index) => (
								<InfoBox
									key={info.label}
									label={info.label}
									icon={info.icon}
									content={(
										<>
											<DefaultText type='title3'>{info.value}</DefaultText>
											<DefaultText type='label3'>{index === 0 ? '회' : '시간'}</DefaultText>
										</>
									)}
								/>
							))}
						</div>
					</Card>
					<div className={styles.averageDurations}>
						{averageDurationList.map(duration => (
							<AverageBar
								key={duration.label}
								label={duration.label}
								value={duration.value}
								color={duration.color as "pastelRed" | "blue400" | "gray300"}
								showChips={!!duration.showChips}
							/>
						))}
					</div>
				</div>
				<Card shadow='none' padding={12} className={styles.walkNotice}>
					<DefaultText type='headline2' color='blue600'>반려견에게 산책은 왜 중요할까요?</DefaultText>
					<DefaultText type='body3' color='gray700'>
						산책은 반려견의 체중을 조절하고 비만을 예방하는 데 중요한 역할을 해요. 근육과 관절을 튼튼하게 유지해주고, 에너지를 건강하게 소모하면서 스트레스 해소와 정서 안정에도 도움을 줄 수 있어요.
					</DefaultText>
				</Card>
			</ResultCard>
		</article>
	);
};

export default WalkScore;