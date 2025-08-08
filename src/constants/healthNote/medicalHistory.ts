import { toLabelValueList } from "@/utils/toLabelValueList";

const DIAGNOSIS_ITEM = {
	GENERAL_CHECKUP: "종합검사",
	PHYSICAL_EXAM: "신체검사",
	BLOOD_TEST: "혈액검사",
	BLOOD_PRESSURE: "혈압측정",
	X_RAY: "방사선 검사",
	URINE_AND_FECES: "소변/분변 검사",
	ANTIBODY_TEST: "항체가 검사",
	HORMONE_TEST: "호르몬 검사",
	ULTRASOUND: "초음파 검사",
	OTHER: "기타",
} as const;

const DIAGNOSIS_ITEM_LIST = toLabelValueList(DIAGNOSIS_ITEM);

export {
	DIAGNOSIS_ITEM,
	DIAGNOSIS_ITEM_LIST,
};