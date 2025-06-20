import * as yup from "yup";

export const gutCheckStepSchema = yup.object({
  step1: yup.object({
    disease: yup.string().required("질병 여부를 선택해주세요."),
  }),
  step2: yup.object({
    dogBodyCondition: yup.string().required("체형을 선택해주세요."),
  }),
  step3: yup.object({
    probiotic: yup
      .boolean()
      .nullable()
      .test(
        "required-probiotic",
        "프로바이오틱스 급여 여부를 선택해주세요.",
        (val) => val === true || val === false
      ),
    probioticName: yup.string().when("probiotic", {
      is: true, // boolean true 일 때
      then: (s) => s.required("프로바이오틱스 제품명을 입력해주세요."),
      otherwise: (s) => s.notRequired(),
    }),
  }),
  step4: yup.object({
    antibiotic: yup.string().required("항생제 급여 여부를 선택해주세요."),
  }),
  step5: yup.object({
    allergy: yup
      .array()
      .of(yup.string().required("알레르기 항목을 선택해주세요."))
      .min(1, "알레르기 항목을 선택해주세요."),
  }),
  step6: yup.object({
    pregnancy: yup.string().required("임신 여부를 선택해주세요."),
  }),
  step7: yup.object({
    activityLevel: yup.string().required("활동량을 선택해주세요."),
  }),
  step8: yup.object({
    treatmentDiseases: yup
      .array()
      .of(yup.string().required("치료 중인 질병을 선택해주세요."))
      .min(1, "치료 중인 질병을 선택해주세요."),
  }),
  step9: yup.object({
    feedingMethod: yup.string().required("급여 방법을 선택해주세요."),
  }),
  step10: yup.object({
    mainFeed: yup.string().required("주식 사료를 선택해주세요."),
  }),
  step11: yup.object({
    feedName: yup.string().required("사료명을 입력해주세요."),
    feedTime: yup.string().required("사료 급여 시간을 선택해주세요."),
    feedFrequency: yup.string().required("사료 급여 횟수를 선택해주세요."),
  }),
  step12: yup.object({
    bowelHabits: yup.string().required("배변 습관을 선택해주세요."),
  }),
  step13: yup.object({
    snackCountLevel: yup.string().required("간식량을 선택해주세요."),
  }),
  step14: yup.object({
    cohabitantPets: yup
      .array()
      .of(yup.string().required("동거 반려동물을 선택해주세요."))
      .min(1, "동거 반려동물을 선택해주세요."),
  }),
  step15: yup.object({
    supplements: yup
      .array()
      .of(yup.string().required("영양 보충제를 선택해주세요."))
      .min(1, "영양 보충제를 선택해주세요."),
    supplementsName: yup.string().when("supplements", {
      is: (value: string[]) => value.length > 0,
      then: (s) => s.required("영양 보충제 이름을 입력해주세요."),
      otherwise: (s) => s.notRequired(),
    }),
  }),
  step16: yup.object({
    petConcerns: yup
      .array()
      .of(yup.string().required("건강적 특이사항을 선택해주세요."))
      .min(1, "건강적 특이사항을 선택해주세요."),
  }),
  step17: yup.object({
    diagnosticKit: yup.string().required("진단 키트 사용 여부를 선택해주세요."),
  }),
});

export type GutCheckStepValues = yup.InferType<typeof gutCheckStepSchema>;
export type GutCheckStepKeys = keyof GutCheckStepValues;

export const defaultGutCheckStepValues: GutCheckStepValues = {
  step1: { disease: "" },
  step2: { dogBodyCondition: "" },
  step3: { probiotic: null, probioticName: "" },
  step4: { antibiotic: "" },
  step5: { allergy: [] },
  step6: { pregnancy: "" },
  step7: { activityLevel: "" },
  step8: { treatmentDiseases: [] },
  step9: { feedingMethod: "" },
  step10: { mainFeed: "" },
  step11: { feedName: "", feedTime: "", feedFrequency: "" },
  step12: { bowelHabits: "" },
  step13: { snackCountLevel: "" },
  step14: { cohabitantPets: [] },
  step15: { supplements: [], supplementsName: "" },
  step16: { petConcerns: [] },
  step17: { diagnosticKit: "" },
};
