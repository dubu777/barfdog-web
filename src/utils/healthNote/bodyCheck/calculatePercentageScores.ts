import { BODY_CHECK_DISEASE_INFO } from "@/constants/healthNote/bodyCheck/common";
import { SurveyOption } from "@/types/healthNote/common";


type SurveyItem = {
	key: string;
	title: string[]; // ["질문 앞부분", "질문 뒷부분"] 형식
	options: SurveyOption[];
	scoreCategory: string[]; // 이 항목이 어떤 점수 카테고리에 영향을 주는지
};

export function calculateCategoryScores(
	selected: Record<string, number>,
	surveyItems: SurveyItem[],
): Record<string, number> {
	const result: Record<string, number> = {};


	surveyItems.forEach(item => {
		const value = selected[item.key];
		if (typeof value !== "number") return;

		item.scoreCategory.forEach(category => {
			result[category] = (result[category] || 0) + value;
		});

	});

	return result;
}

export function calculatePercentageScores(
	selected: Record<string, number>,
	categoryMap: typeof BODY_CHECK_DISEASE_INFO,
	surveyItems: SurveyItem[],
) {
	const rawScores = calculateCategoryScores(selected, surveyItems);

	return Object.entries(rawScores).reduce<Record<string, Omit<ReturnType<typeof calculatePercentageScores>[number], "category">>>(
		(acc, [category, rawScore]) => {
			const meta = categoryMap[category];
			if (!meta) return acc;

			const percentage = Math.floor(
				Math.min(Math.max((rawScore / meta.max) * 100, 0), 100)
			);

			acc[category] = {
				label: meta.name,
				rawScore,
				maxScore: meta.max,
				percentage,
			};

			return acc;
		},
		{}
	);
}