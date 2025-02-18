import * as yup from "yup";

export const surveyStepsSchema = yup.object({
  step1: yup.object({
    name: yup
      .string()
      .trim() // 앞뒤 공백 제거
      .min(1, "이름은 최소 1자 이상이어야 합니다.")
      .required("이름을 입력해주세요"),
  }),
  step2: yup.object({
    gender: yup.string().required("성별을 선택해주세요"),
  }),
  step3: yup.object({
    neutralization: yup
      .boolean()
      .nullable()
      .test(
        "not-null",
        "중성화 여부를 선택해주세요",
        (value) => value !== null
      ),
  }),
  step4: yup.object({
    dogSize: yup.string().required("견종 크기를 선택해주세요."),
    dogType: yup.string().required("견종을 선택해주세요."),
  }),
  step5: yup.object({
    birth: yup
      .string()
      .matches(/^\d{6}$/, "생년월일을 모두 입력해주세요.")
      .required("출생일은 필수입니다."),
    oldDog: yup.boolean().required("노령견 여부를 선택해주세요."),
  }),
  step6: yup.object({
    weight: yup
      .string()
      .matches(/^\d+(\.\d+)?$/, "숫자만 입력해 주세요.")
      .matches(
        /^\d+(?:\.\d{0,1})?$/,
        "몸무게는 소숫점 첫째 자리까지 입력할 수 있습니다."
      )
      .required("몸무게를 입력해주세요."),
  }),
  step7: yup.object({
    dogStatus: yup.string().required("현재 상태를 선택해주세요."),
    specificDogStatus: yup.string().defined(),
    specificDogStatusEtc: yup
      .string().defined(),
    expectedPregnancyDay: yup.string().defined(),
  }),
  step8: yup.object({
    activityLevel: yup.string().required("활동량을 선택해주세요."),
  }),
  step9: yup.object({
    walkingCountPerWeek: yup
      .string()
      .required("주 평균 산책 횟수를 입력해주세요."),
    walkingTimePerOneTime: yup
      .string()
      .required("1회 산책 시간을 입력해주세요."),
  }),
  step10: yup.object({
    snackCountLevel: yup.string().required("간식량을 선택해주세요."),
  }),
  step11: yup.object({
    waterCountLevel: yup.string().required("음수량을 선택해주세요."),
  }),
  step12: yup.object({
    supplement: yup
      .array()
      .of(yup.string().defined())
      .min(1, "영양제 선택은 필수입니다.")
      .required(),
    supplementEtc: yup.string().defined(),
  }),
  step13: yup.object({
    // 다중 선택: 배열로 입력되며 최소 1개 선택해야 함
    inedibleFood: yup
      .array()
      .of(yup.string().defined())
      .min(1, "못 먹는 재료를 선택해주세요.")
      .required(),
    inedibleFoodEtc: yup.string().defined(),
  }),
  step14: yup.object({
    currentMeal: yup.string().required("현재 식사를 선택해주세요."),
  }),
  step15: yup.object({
    // 다중 선택: 배열로 입력되며 최소 1개 선택해야 함
    caution: yup
      .array()
      .of(yup.string().defined())
      .min(1, "건강적 특이사항을 선택해주세요.").required(),
    cautionEtc: yup.string().defined(),
  }),
  step16: yup.object({
    newToRawDiet: yup
      .boolean()
      .nullable()
      .test(
        "not-null",
        "생식 급여 여부를 입력해주세요",
        (value) => value !== null
      ),
  }),
  step17: yup.object({
    // 다중 선택: 배열로 입력되며 최소 1개 선택해야 함
    priorityConcerns: yup
      .array()
      .of(yup.string().defined())
      .min(3, "우선 고민 항목을 선택해주세요.").required(),
  }),
});

export type SurveyStepValues = yup.InferType<typeof surveyStepsSchema>;
export type SurveyStepKeys = keyof SurveyStepValues;

export const defaultStepValues: SurveyStepValues = {
  step1: { name: "" },
  step2: { gender: "" },
  step3: { neutralization: null },
  step4: { dogSize: "", dogType: "" },
  step5: { birth: "", oldDog: false },
  step6: { weight: "" },
  step7: {
    dogStatus: "",
    specificDogStatus: "",
    specificDogStatusEtc: "",
    expectedPregnancyDay: "",
  },
  step8: { activityLevel: "" },
  step9: { walkingCountPerWeek: "", walkingTimePerOneTime: "" },
  step10: { snackCountLevel: "" },
  step11: { waterCountLevel: "" },
  step12: { supplement: [], supplementEtc: "" },
  step13: { inedibleFood: [], inedibleFoodEtc: "" },
  step14: { currentMeal: "" },
  step15: { caution: [], cautionEtc: "" },
  step16: { newToRawDiet: null },
  step17: { priorityConcerns: [] },
};
