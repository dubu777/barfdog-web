import * as yup from "yup";

export const gutCheckStepSchema = yup.object({
  step1: yup.object({
    disease: yup.string().required("질병 여부를 선택해주세요."),
  }),
  step2: yup.object({
    dogBodyCondition: yup.string().required("체형을 선택해주세요."),
  }),
  step3: yup.object({
    probioticsExist: yup.string().required("유산균 급여 여부를 선택해주세요."),
    // ① 존재 여부가 EXIST일 때만 string 타입으로 검증
    probiotics: yup.string().when("probioticsExist", {
      is: "EXIST",
      then: (schema) => schema.required("유산균 제품명을 입력해주세요."),
      otherwise: (schema) => schema.notRequired(),
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
    // ① 존재 여부 필드 추가 (EXIST | NONE)
    treatmentDiseasesExist: yup
      .string()
      .required("치료중 질병 여부를 선택해주세요."),

    // ② 존재 여부가 EXIST일 때만 배열 검증
    treatmentDiseases: yup
      .array()
      // 기본적으로는 string 타입 배열이지만, 길이나 required 검증은 when 안에서만
      .of(yup.string())
      .when("treatmentDiseasesExist", {
        is: "EXIST",
        then: (schema) =>
          schema
            .of(yup.string().required("치료 중인 질병을 선택해주세요."))
            .min(1, "치료 중인 질병을 선택해주세요.")
            .required(),
        otherwise: (schema) => schema.notRequired(),
      }),
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
    // boolean 으로 변경
    supplementsExist: yup.string().required("영양제 급여 여부를 선택해주세요."),

    // 보충제 종류 (눈, 관절, 장, 구강) 배열
    supplements: yup
      .array()
      .of(yup.string().required("영양제 종류를 선택해주세요."))
      .min(1, "영양제 종류를 최소 하나 선택해주세요.")
      .when("supplementsExist", {
        is: "EXIST",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),

    // 보충제 이름
    supplementsName: yup.string().when("supplementsExist", {
      is: "EXIST",
      then: (s) => s.required("영양제 이름을 입력해주세요."),
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
  step3: { probioticsExist: "", probiotics: "" },
  step4: { antibiotic: "" },
  step5: { allergy: ["임시데이터"] },
  step6: { pregnancy: "" },
  step7: { activityLevel: "" },
  step8: { treatmentDiseasesExist: "", treatmentDiseases: [] },
  step9: { feedingMethod: "" },
  step10: { mainFeed: "" },
  step11: { feedName: "", feedTime: "", feedFrequency: "" },
  step12: { bowelHabits: "" },
  step13: { snackCountLevel: "" },
  step14: { cohabitantPets: [] },
  step15: { supplementsExist: "", supplements: [], supplementsName: "" },
  step16: { petConcerns: [] },
  step17: { diagnosticKit: "" },
};
