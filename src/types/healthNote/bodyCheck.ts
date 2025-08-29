import { BODY_CHECK_DISEASE_INFO, BODY_PART, DISEASE_PHASES } from "@/constants/healthNote/bodyCheck/common";
import { RecommendedItem, SuspectedDiseaseCategory } from "@/types/healthNote/fullCheck";
import { ComponentType, SVGProps } from "react";

type DiseasePhaseType = keyof typeof DISEASE_PHASES;
type DiseaseCategoryKey = keyof typeof BODY_CHECK_DISEASE_INFO;

type BodyPartType = keyof typeof BODY_PART;

interface BaseBodyCheck {
	diagnosisId: number;
	simpleTotalScore: number;
	bodyPartTotalScore: number;
	bodyPartType: BodyPartType;
	diagnosisDate: string;
}

interface GastroDiagnosis {
	hemorrhagicEnteritisScore: number;
	gastricUlcerScore: number;
	enteritisScore: number;
	ibsScore: number;
	gastroLifestyleScore: number;
}

interface ObesityDiagnosis {
	weightBalanceScore: number;
	activityScore: number;
	dietaryScore: number;
}

interface SkinDiagnosis {
	bacterialDermatitisScore: number;
	mycoticDermatitisScore: number;
	fleaTickDermatitisScore: number;
	malasseziaDermatitisScore: number;
	skinLifestyleScore: number;
}

type GastroDiagnosisData = BaseBodyCheck & GastroDiagnosis;
type ObesityDiagnosisData = BaseBodyCheck & ObesityDiagnosis;
type SkinDiagnosisData = BaseBodyCheck & SkinDiagnosis;

interface LatestBodyCheck {
	gastro: GastroDiagnosisData;
	obesity: ObesityDiagnosisData;
	skin: SkinDiagnosisData;
}

interface BaseFormValues {
	petId: number;
	simpleTotalScore: number;
}

type GastroFormValues = BaseFormValues & GastroDiagnosis;
type ObesityFormValues = BaseFormValues & ObesityDiagnosis;
type SkinFormValues = BaseFormValues & SkinDiagnosis;

type BodyPartMap = {
	gastro: { form: GastroFormValues; response: GastroDiagnosisData };
	obesity: { form: ObesityFormValues; response: ObesityDiagnosisData };
	skin: { form: SkinFormValues; response: SkinDiagnosisData };
};

// FullCheck type 내에 정의
interface BodyCheckRecommendedItem extends Omit<RecommendedItem, 'diseaseCategory'> {
	diseaseCategory: SuspectedDiseaseCategory & 'OBD';
}

interface BaseBodyCheckDetail extends BaseBodyCheck {
	recommendedItemList: BodyCheckRecommendedItem[];
}

type WithScoresArray<T> = {
  scores: { name: keyof T; score: number }[];
};

type GastroDiagnosisDetail = BaseBodyCheckDetail & WithScoresArray<GastroDiagnosis>;
type ObesityDiagnosisDetail = BaseBodyCheckDetail & WithScoresArray<ObesityDiagnosis>;
type SkinDiagnosisDetail = BaseBodyCheckDetail & WithScoresArray<SkinDiagnosis>;

type BodyCheckDetailMap = {
	gastro: GastroDiagnosisDetail;
	obesity: ObesityDiagnosisDetail;
	skin: SkinDiagnosisDetail;
};

interface BodyCheckHealthTip {
	step: "first" | "second" | "third",
	title: string;
	description: string;
	practices: string[];
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export type {
	DiseasePhaseType,
	BodyPartType,
	DiseaseCategoryKey,
	GastroDiagnosisData,
	ObesityDiagnosisData,
	SkinDiagnosisData,
	LatestBodyCheck,
	GastroDiagnosis,
	ObesityDiagnosis,
	SkinDiagnosis,
	GastroFormValues,
	ObesityFormValues,
	SkinFormValues,
	BodyCheckRecommendedItem,
	BodyPartMap,
	BodyCheckDetailMap,
	BodyCheckHealthTip,
	BaseFormValues,
}