const HEALTH_CHECK_HISTORY_TAG_MAP = {
	comprehensive: "종합검사",
	physical: "신체검사",
	blood_pressure_test: "혈압검사",
	blood_pressure_check: "혈압측정",
	xray: "방사선 검사",
	urine_stool: "소변/분변 검사",
	antibody_titer: "항체가 검사",
	hormone: "호르몬 검사",
	ultrasound: "초음파 검사",
	others: "기타 검사"
} as const;

export {
	HEALTH_CHECK_HISTORY_TAG_MAP,
};