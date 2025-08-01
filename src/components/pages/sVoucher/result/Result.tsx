'use client';
import * as styles from './Result.css';
import Divider from "@/components/common/divider/Divider";
import ResultInfo from "@/components/pages/sVoucher/result/resultInfo/ResultInfo";
import ResultAverage from "@/components/pages/sVoucher/result/resultAverage/ResultAverage";
import ResultProductItems from "@/components/pages/sVoucher/result/resultProductItems/ResultProductItems";
import { useGetObesityDetail } from "@/api/sVoucher/query/useGetObesityDetail";

interface SurveyResultProps {
	surveyId: number;
}

export default function Result({ surveyId }: SurveyResultProps) {
	const { data } = useGetObesityDetail(surveyId);

	if (!data) return null;
	return (
		<div className={styles.resultContainer}>
			<ResultInfo data={data} surveyId={surveyId} />
			<Divider thickness={8} color='gray100' />
			<ResultAverage score={data.score} />
			<Divider thickness={8} color='gray100' />
			<ResultProductItems />
		</div>
	);
}