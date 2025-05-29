import { ComponentType, SVGProps } from "react";
import { BODY_PART_PRIORITY, BODY_PART_TO_CATEGORY, DISEASE_CATEGORY, DISEASE_INFO } from "@/constants";

type ScoreInput = Record<string, number>;

export function getTopSuspectedDiseases(scoreInput: ScoreInput) {
	// 최종 후보 질환 리스트를 저장할 배열
	const candidates: {
		categoryKey: string;
		category: string;
		categoryImage: ComponentType<SVGProps<SVGSVGElement>>;
		diseaseKey: string;
		disease: (typeof DISEASE_INFO)[keyof typeof DISEASE_INFO];
		score: number;
	}[] = [];

	// 입력된 각 부위 순회
	for (const part in scoreInput) {
		// 해당 부위의 카테고리 매핑
		const category = BODY_PART_TO_CATEGORY[part];
		if (!category) continue;

		// 해당 카테고리에 해당하는 모든 질환 추출
		const relatedDiseases = Object.entries(DISEASE_INFO).filter(([, d]) => d.category === category);
		if (relatedDiseases.length === 0) continue;

		// 점수와 일치하는 value 값을 가진 질환 찾기
		const matchedDisease = relatedDiseases?.find(
			([, d]) => d.value === scoreInput[part]
		);

		// 일치하는 질환이 없으면 skip
		if (!matchedDisease) continue;

		const [diseaseKey, disease] = matchedDisease;

		// 후보 배열에 추가
		candidates.push({
			categoryKey: part,
			category,
			diseaseKey,
			disease,
			score: scoreInput[part],
			categoryImage: DISEASE_CATEGORY[part].imageUrl,
		});
	}

	// 최종 정렬:
	// 1. 점수가 낮은 순서 (score 오름차순)
	// 2. 점수가 같을 경우 카테고리 우선순위에 따라 정렬
	const sorted = candidates.sort((a, b) => {
		if (a.score !== b.score) return a.score - b.score;

		// BODY_PART_PRIORITY 배열의 순서를 기준으로 정렬
		return (
			BODY_PART_PRIORITY.indexOf(a.category) -
			BODY_PART_PRIORITY.indexOf(b.category)
		);
	});

	// 최대 3개까지 반환
	return sorted.slice(0, 3);
}