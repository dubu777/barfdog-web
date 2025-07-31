import * as yup from "yup";

export const gutCheckStepSchema = yup.object({
  step1: yup.object({
    bodyFit: yup.string().required("체형을 선택해주세요."),
  }),
  step2: yup.object({
    probioticsStatus: yup.string().required("유산균 급여 여부를 선택해주세요."),
    probioticsProduct: yup.string().when("probioticsStatus", {
      is: "TAKING",
      then: (schema) => schema.required("유산균 제품명을 입력해주세요."),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  step3: yup.object({
    antibioticsStatus: yup
      .string()
      .required("항생제 급여 여부를 선택해주세요."),
  }),
  step4: yup.object({
    allergyStatus: yup.string().required("알러지 여부를 선택해주세요."),
    allergenFoodList: yup
      .array()
      .of(yup.string().required())
      .when("allergyStatus", {
        is: "HAS_ALLERGY",
        then: (schema) =>
          schema
            .min(1, "해당되는 알레르기 항목을 하나 이상 선택해주세요.")
            .required(),
        otherwise: (schema) => schema.notRequired(),
      }),
  }),
  step5: yup.object({
    pregnancyStatus: yup.string().required("임신 여부를 선택해주세요."),
  }),
  step6: yup.object({
    activityLevel: yup.string().required("활동량을 선택해주세요."),
  }),
  step7: yup.object({
    treatmentDiseasesExist: yup
      .string()
      .required("치료중 질병 여부를 선택해주세요."),
    treatingDiseaseList: yup
      .array()
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
  step8: yup.object({
    feedType: yup.string().required("급여 방법을 선택해주세요."),
  }),
  step9: yup.object({
    foodType: yup.string().required("주식 사료를 선택해주세요."),
  }),
  step10: yup.object({
    foodProduct: yup.string().required("사료명을 입력해주세요."),
    feedTime: yup.string().required("사료 급여 시간을 선택해주세요."),
  }),
  step11: yup.object({
    defecationHabit: yup.string().required("배변 습관을 선택해주세요."),
  }),
  step12: yup.object({
    snackLevel: yup.string().required("간식량을 선택해주세요."),
  }),
  step13: yup.object({
    cohabitingPetList: yup
      .array()
      .of(yup.string().required("동거 반려동물을 선택해주세요."))
      .min(1, "동거 반려동물을 선택해주세요."),
  }),
  step14: yup.object({
    supplementsExist: yup.string().required("영양제 급여 여부를 선택해주세요."),
    supplementTypeList: yup
      .array()
      .of(yup.string().required("영양제 종류를 선택해주세요."))
      .min(1, "영양제 종류를 최소 하나 선택해주세요.")
      .when("supplementsExist", {
        is: "EXIST",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    supplementProduct: yup.string().when("supplementsExist", {
      is: "EXIST",
      then: (s) => s.required("영양제 이름을 입력해주세요."),
      otherwise: (s) => s.notRequired(),
    }),
  }),
  step15: yup.object({
    healthConcernTypeList: yup
      .array()
      .of(yup.string().required("건강적 특이사항을 선택해주세요."))
      .min(1, "건강적 특이사항을 선택해주세요."),
  }),
  step16: yup.object({
    acquisitionType: yup
      .string()
      .required("진단 키트 사용 여부를 선택해주세요."),
  }),
  step17: yup.object({
    otherComment: yup.string(),
  }),
});

export type GutCheckStepValues = yup.InferType<typeof gutCheckStepSchema>;
export type GutCheckStepKeys = keyof GutCheckStepValues;

export const defaultGutCheckStepValues: GutCheckStepValues = {
  step1: { bodyFit: "" },
  step2: {
    probioticsStatus: "",
    probioticsProduct: "",
  },
  step3: { antibioticsStatus: "" },
  step4: {
    allergyStatus: "",
    allergenFoodList: [],
  },
  step5: { pregnancyStatus: "" },
  step6: { activityLevel: "" },
  step7: {
    treatmentDiseasesExist: "",
    treatingDiseaseList: [],
  },
  step8: { feedType: "" },
  step9: { foodType: "" },
  step10: {
    foodProduct: "",
    feedTime: "",
  },
  step11: { defecationHabit: "" },
  step12: { snackLevel: "" },
  step13: { cohabitingPetList: [] },
  step14: {
    supplementsExist: "",
    supplementTypeList: [],
    supplementProduct: "",
  },
  step15: { healthConcernTypeList: [] },
  step16: { acquisitionType: "" },
  step17: { otherComment: "" },
};
