import * as yup from "yup";

export const surveyStepsSchema = yup.object({
  step1: yup.object({
    neutralization: yup
      .boolean()
      .nullable()
      .test(
        "not-null",
        "중성화 여부를 선택해주세요.",
        (value): value is boolean => value !== null
      ),
  }),
  step2: yup.object({
    oldDog: yup
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
      .test(
        "min-weight",
        "몸무게가 작은 아이의 경우 급여량이 적게 계산될 수 있어요. 포장은 20g부터 가능하지만, 급여는 계산된 양에 맞춰 나눠주시면 됩니다.",
        (value) => {
          if (!value) return false;
          const parsed = parseFloat(value);
          return parsed >= 1;
        }
      )
      .required("몸무게를 입력해주세요."),
  }),
  step4: yup.object({
    pregnancy: yup.string().required("임신여부를 선택해주세요."),
  }),
  step5: yup.object({
    lactation: yup.string().required("수유여부를 선택해주세요."),
  }),
  step6: yup.object({
    bodyCondition: yup.string().required("체형을 선택해주세요."),
  }),
  step7: yup.object({
    activityLevel: yup.string().required("활동량을 선택해주세요."),
  }),
  step8: yup.object({
    snackCountLevel: yup.string().required("간식량을 선택해주세요."),
  }),
  step9: yup.object({
    inedibleFoodStatus: yup.string().required("알러지 여부를 선택해주세요."),
    inedibleFoods: yup
      .array()
      .of(yup.string().required())
      .when("inedibleFoodStatus", {
        is: "HAS_ALLERGY",
        then: (schema) =>
          schema
            .min(1, "해당되는 알레르기 항목을 하나 이상 선택해주세요.")
            .required(),
        otherwise: (schema) => schema.notRequired(),
      }),
  }),
  step10: yup.object({
    healthConcerns: yup
      .array()
      .of(yup.string().defined())
      .min(3, "고민 항목을 선택해주세요.")
      .required(),
  }),
  step11: yup.object({
    currentMeals: yup
      .array()
      .of(yup.string().defined())
      .min(1, "사료를 선택해주세요.")
      .required(),
  }),
  step12: yup.object({
    supplements: yup
      .array()
      .of(yup.string().defined())
      .min(1, "영양제를 선택해주세요.")
      .required(),
  }),
  step13: yup.object({
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
  step1: { neutralization: null }, // 중복체크 API 정상화 되면 주석 해제
  step2: { oldDog: null },
  step3: { dogSize: "", weight: "" },
  step4: { pregnancy: "" },
  step5: { lactation: "" },
  step6: {
    bodyCondition: "",
  },
  step7: { activityLevel: "" },
  step8: { snackCountLevel: "" },
  step9: { inedibleFoodStatus: "", inedibleFoods: [] },
  step10: { healthConcerns: [] },
  step11: { currentMeals: [] },
  step12: { supplements: [] },
  step13: { healthIssues: [] },
};
