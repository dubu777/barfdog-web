import * as yup from "yup";

export const surveyStepsSchema = yup.object({
  step1: yup.object({
    gender: yup.string().required("성별을 선택해주세요"),
    name: yup
      .string()
      .trim()
      .min(1, "이름은 최소 1자 이상이어야 합니다.")
      .required("이름을 입력해주세요"),
    isNeutered: yup
      .boolean()
      .nullable()
      .test(
        "not-null",
        "중성화 여부를 선택해주세요.",
        (value): value is boolean => value !== null
      ),
  }),
  step2: yup.object({
    birth: yup
      .string()
      .matches(/^\d{6}$/, "생년월일을 모두 입력해주세요.")
      .required("출생일은 필수입니다."),
    isSenior: yup
      .boolean()
      .nullable()
      .test(
        "not-null",
        "노령견 여부를 선택해주세요.",
        (value): value is boolean => value !== null
      ),
  }),
  step3: yup.object({
    dogSize: yup.string().required("견종 크기를 선택해주세요."),
    weight: yup
      .string()
      .matches(/^\d+(\.\d+)?$/, "숫자만 입력해 주세요.")
      .matches(
        /^\d+(?:\.\d{0,1})?$/,
        "몸무게는 소숫점 첫째 자리까지 입력할 수 있습니다."
      )
      .required("몸무게를 입력해주세요."),
  }),
  step4: yup.object({
    dogType: yup.string().required("견종을 선택해주세요."),
  }),
  step5: yup.object({
    pregnancy: yup.string().required("임신여부를 선택해주세요."),
  }),
  step6: yup.object({
    lactation: yup.string().required("수유여부를 선택해주세요."),
  }),
  step7: yup.object({
    bodyCondition: yup.string().required("체형을 선택해주세요."),
  }),
  step8: yup.object({
    activityLevel: yup.string().required("활동량을 선택해주세요."),
  }),
  step9: yup.object({
    snackFrequency: yup.string().required("간식량을 선택해주세요."),
  }),
  step10: yup.object({
    inedibleFood: yup
      .array()
      .of(yup.string().defined())
      .min(1, "못 먹는 재료를 선택해주세요.")
      .required(),
  }),
  step11: yup.object({
    healthConcerns: yup
      .array()
      .of(yup.string().defined())
      .min(3, "고민 항목을 선택해주세요.")
      .required(),
  }),
  step12: yup.object({
    currentMeal: yup
    .array()
    .of(yup.string().defined())
    .min(1, "사료를 선택해주세요.")
    .required(),
  }),
  step13: yup.object({
    supplement: yup
      .array()
      .of(yup.string().defined())
      .min(1, "영양제를 선택해주세요.")
      .required(),
  }),
  step14: yup.object({
    // 다중 선택: 배열로 입력되며 최소 1개 선택해야 함
    healthIssues: yup
      .array()
      .of(yup.string().defined())
      .min(1, "건강적 특이사항을 선택해주세요.")
      .required(),
  }),
});

export type SurveyStepValues = yup.InferType<typeof surveyStepsSchema>;
export type SurveyStepKeys = keyof SurveyStepValues;

export const defaultStepValues: SurveyStepValues = {
  step1: { gender: "", name: "", isNeutered: null },
  step2: { birth: "", isSenior: null },
  step3: { dogSize: "", weight: "" },
  step4: { dogType: "" },
  step5: { pregnancy: "" },
  step6: { lactation: "" },
  step7: {
    bodyCondition: "",
  },
  step8: { activityLevel: "" },
  step9: { snackFrequency: "" },
  step10: { inedibleFood: [] },
  step11: { healthConcerns: [] },
  step12: { currentMeal: [] },
  step13: { supplement: [] },
  step14: { healthIssues: [] },
};
