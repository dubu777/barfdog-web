'use client';
import * as styles from './FullCheckResult.css';
import { useRouter } from "next/navigation";
import DeleteIcon from "/public/images/icons/trashbag.svg";
import CalendarIcon from "/public/images/icons/calendar.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Header from "@/components/layout/header/Header";
import TotalScore from "@/components/pages/heathNote/fullCheck/result/totalScore/TotalScore";
import ChangedScore from "@/components/pages/heathNote/fullCheck/result/changedScore/ChangedScore";
import WalkScore from "@/components/pages/heathNote/fullCheck/result/walkScore/WalkScore";
import SuspectedDiseases from "@/components/pages/heathNote/fullCheck/result/suspectedDiseases/SuspectedDiseases";
import ProductList from "@/components/pages/heathNote/fullCheck/result/productList/ProductList";
import BodyCheck from "@/components/pages/heathNote/fullCheck/result/bodyCheck/BodyCheck";
import DietAnalysisSurvey from "@/components/pages/heathNote/fullCheck/result/dietAnalysisSurvey/DietAnalysisSurvey";
import { getTopSuspectedDiseases } from "@/utils/healthNote/getTopSuspectedDiseases";
import { getRecommendedProducts } from "@/utils/healthNote/getRecommendedProducts";

const dummyData = {
	name: '바푸동',
	createdDate: '2025-05-02',
	dogSize: 'MIDDLE',
	score: 70,
	scoreChange: {
		prevScore: 50,
		prevDate: '2025-04-02',
		bodyPart: ['kidney', 'joint'],
	},
	rank: {
		overall: 2.4,
		dogSize: 5,
	},
	walkScore: {
		rank: 2.7,
		averageCount: 8,
		averageDurationHours: 18,
	},
	averageDurations: {
		hourByOverall: 14,
		hourByPeers: 12,
		hourByDogSize: 24,
	},
};

const temp = {
	"coat": 3,
	"walk": 2,
	"skin": 4,
	"eyes": 2,
	"teeth": 2,
	"gut": 9,
	"thyroid": 9,
	"joint": 9,
	"knee": 9,
	"heart": 9,
	"kidney": 9,
	"immune": 9
}

const FullCheckResult = () => {
	const router = useRouter();

	const data = dummyData;

	const topSuspectedDiseases = getTopSuspectedDiseases(temp);
	const diseasesCategoryKeys = topSuspectedDiseases.map(disease => disease.categoryKey);
	const recommendProducts = getRecommendedProducts(diseasesCategoryKeys, data.dogSize);

	const handleDelete = () => {
		console.log('handleDelete')
	}
	return (
		<>
			<Header
				showBackButton
				centerTitle='결과 상세'
				onBack={() => router.back()}
				rightElement={(
					<button onClick={handleDelete} className={styles.deleteButton}>
						<SvgIcon
							src={DeleteIcon}
							size={24}
						/>
					</button>
				)}
			/>
			<section className={styles.fullCheckResultContainer}>
				<article>
					<DefaultText type='body3' className={styles.fullCheckResultTitle}>
						<SvgIcon src={CalendarIcon} size={20} />
						{data.createdDate} 건강 종합 진단 결과
					</DefaultText>
					<TotalScore
						dogName={data.name}
						totalScore={data.score}
						rankOverall={data.rank.overall}
						rankDogSize={data.rank.dogSize}
						dogSize={data.dogSize}
					/>
				</article>
				<ChangedScore
					score={data.score}
					prevScore={data.scoreChange.prevScore}
					prevDate={data.scoreChange.prevDate}
					createdDate={data.createdDate}
					bodyPart={data.scoreChange.bodyPart}
				/>
				<WalkScore
					dogName={data.name}
					dogSize={data.dogSize}
					walkRank={data.walkScore.rank}
					averageCount={data.walkScore.averageCount}
					averageDurationHours={data.walkScore.averageDurationHours}
					averageDurations={data.averageDurations}
				/>
				<SuspectedDiseases
					dogName={data.name}
					diseaseList={topSuspectedDiseases}
				/>
				<ProductList
					dogName={data.name}
					recommendProducts={recommendProducts}
				/>
				<BodyCheck />
				<DietAnalysisSurvey />
			</section>
		</>
	);
};

export default FullCheckResult;