import * as yup from "yup";

export const subscriptionSchema = yup.object().shape({
  mealFrequency: yup.string().required("식사량은 필수입니다."),
  deliveryCycle: yup.string().required("배송주기는 필수입니다."),
  nextPaymentPrice: yup.string().required("nextPaymentPrice는 필수입니다."),
  oneDayRecommendKcal: yup
    .string()
    .required("oneDayRecommendKcal는 필수입니다."),
  mealAmount: yup.string().required("급여량는 필수입니다."),
  recipeIdList: yup
    .array()
    .of(yup.string().defined())
    .min(1, "레시피를 선택해주세요.")
    .required(),
  optionList: yup.array().of(yup.string().defined()),
});

export type SubscriptionValues = yup.InferType<typeof subscriptionSchema>;
export type SubscriptionKeys = keyof SubscriptionValues;

export const defaultSubscriptionValues: SubscriptionValues = {
  mealFrequency: "",
  deliveryCycle: "",
  nextPaymentPrice: "",
  oneDayRecommendKcal: "",
  mealAmount: "",
  recipeIdList: [],
  optionList: [],
}
