import * as styles from './WalkScore.css';
import { Fragment } from "react";
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

interface WalkScoreProps {
	petName: string;
	totalWalkScorePercentile: number;
	avgTotalWalkCount: number;
	avgTotalWalkHours: number;
	avgCohortWalkScore: number;
	avgTotalWalkScore: number;
	walkHours: number;
	walkCount: number;
}

export default function WalkScore ({
	petName,
	totalWalkScorePercentile,
	avgTotalWalkCount,
	avgTotalWalkHours,
	avgCohortWalkScore,
	avgTotalWalkScore,
	walkHours,
	walkCount,
}: WalkScoreProps) {
	const walkInfo = [
		{
			label: '산책 횟수',
			icon: FootprintIcon,
			value: avgTotalWalkCount,
		},
		{
			label: '1회당 산책 시간',
			icon: HistoryIcon,
			value: avgTotalWalkHours,
		},
	]

	const averageGraphList = [
		{
			label: '전체평균',
			value: avgTotalWalkScore,
			color: 'pastelRed',
		},
		{
			label: '또래',
			value: avgCohortWalkScore,
			color: 'gray300',
		},
		{
			label: petName,
			value: walkHours * walkCount,
			color: 'blue400',
			showChips: true,
		},
	]

	const maxValue = Math.max(...averageGraphList.map(d => d.value));
	return (
		<article>
			<ResultCard
				className={styles.walkScoreContainer}
				title={`${petName}의 산책 습관\n 다른 아이들과 비교해볼까요?`}
				subTitle='일주일 기준으로 점수가 매겨져요'
			>
				<div className={styles.walkScoreContentBox}>
					<Image src={WalkDogImage} alt='walk dog' width={303} height={140} />
					<Card shadow='none'>
						<div className={styles.walkScoreTop}>
							<DefaultText type='headline2'>{petName}의<br/>산책 활동 통계</DefaultText>
							<div>
								<DefaultText type='display1' applyLineHeight>
									<DefaultText type='label4'>상위</DefaultText>
									&nbsp;{totalWalkScorePercentile}
									<DefaultText type='label4'>%</DefaultText>
								</DefaultText>
							</div>
						</div>
						<Divider thickness={1} color='gray100' />
						<div className={styles.averageGraph}>
							{averageGraphList.map(duration => (
								<AverageBar
									key={duration.label}
									label={duration.label}
									value={duration.value}
									color={duration.color as "pastelRed" | "blue400" | "gray300"}
									showChips={!!duration.showChips}
									maxValue={maxValue}
								/>
							))}
						</div>
					</Card>
					<DefaultText type='headline2' className={styles.walkScoreInfoTitle}>전체 반려견의 평균 산책 습관</DefaultText>
					<Card direction='row' className={styles.walkScoreInfo}>
						{walkInfo.map((info, index) => (
							<Fragment key={info.label}>
								<InfoBox
									label={info.label}
									icon={info.icon}
									align='start'
									content={(
										<>
											<DefaultText type='title3'>{info.value}</DefaultText>
											<DefaultText type='label3'>{index === 0 ? '회' : '시간'}</DefaultText>
										</>
									)}
								/>
								{index === 0 &&
									<Divider thickness={1} direction='vertical' color='gray100' />
								}
							</Fragment>
						))}
					</Card>
				</div>
				<Card
					shadow='none'
					padding={12}
					gap={8}
					className={styles.walkNotice}
				>
					<DefaultText type='headline2' color='blue600'>반려견에게 산책은 왜 중요할까요?</DefaultText>
					<DefaultText type='body3' color='gray700'>
						산책은 반려견의 체중을 조절하고 비만을 예방하는 데 중요한 역할을 해요. 근육과 관절을 튼튼하게 유지해주고, 에너지를 건강하게 소모하면서 스트레스 해소와 정서 안정에도 도움을 줄 수 있어요.
					</DefaultText>
				</Card>
			</ResultCard>
		</article>
	);
};