import {Pagination} from "@/types";
import {BODY_PART_TO_CATEGORY, DISEASE_INFO} from "@/constants";
import {AxiosInstance} from "axios";

type SuspectedDiseaseCategory = keyof typeof BODY_PART_TO_CATEGORY;
type SuspectedDiseaseType = keyof typeof DISEASE_INFO;

interface FullCheckSummary {
	diagnosisId: number
	checkupScore: number                    // 펫의 가장 최근 건강종합진단 점수
	checkupScoreUpperPercentile: number     // 상위 백분위(%)
	avgCheckupScore: number                 // 건강종합진단 전체 평균 점수 스냅샷
	isExistDiagnosis: boolean               // 건강종합진단 유무
}

interface Snapshot {
	previousDiagnosisDate: null | string,      // 직전 건강좁합진단일
	scoreDifference: number;                   // 직전 건강종합점수 차
	totalCheckupScorePercentile: number;       // 전체기준 종합점수 백분위
	totalWalkScorePercentile: number;          // 전체기준 산책점수 백분위
	cohortCheckupScorePercentile: number;      // 또래기준 종합점수 백분위

	/** 평균 통계 **/
	/* 전체 */
	avgTotalCheckupScore: number;        // 평균 종합점수
	avgTotalWalkScore: number;           // 평균 산책점수
	avgTotalWalkCount: number;           // 평균 산책횟수(주당)
	avgTotalWalkHours: number;           // 평균 산책시간(회당)

	/* 또래 */
	avgCohortCheckupScore: number | null;       // 평균 종합점수
	avgCohortWalkScore: number | null;          // 평균 산책점수
	avgCohortWalkCount: number | null;          // 평균 산책횟수(주당)
	avgCohortWalkHours: number | null;          // 평균 산책시간(회당)
}

interface CheckupDiagnosis {
	diagnosisId: number;
	petId: number;
	diagnosisDate: string;
	checkupScore: number;
	walkCount: number;
	walkHours: number;
	suspectedDiseaseCategoryList: SuspectedDiseaseCategory[];
	suspectedDiseaseTypeList: SuspectedDiseaseType[];
	snapshot: Snapshot;
}

interface FullCheckList {
	page: Pagination;
	checkupDiagnosisList: CheckupDiagnosis[];
}

interface FullCheckListSearchValues {
	petId: number;
	pageParam?: number;
	size?: number;
	instance?: AxiosInstance;
}

interface FullCheckFormValues {
	petId: number;
	checkupScore: number;
	walkCount: number;
	walkHours: number;
	suspectedDiseaseCategoryList: SuspectedDiseaseCategory[];
	suspectedDiseaseTypeList: SuspectedDiseaseType[];
}

export type {
	SuspectedDiseaseCategory,
	SuspectedDiseaseType,
	FullCheckSummary,
	CheckupDiagnosis,
	FullCheckList,
	FullCheckListSearchValues,
	FullCheckFormValues,
}