import * as yup from "yup";

export const subscriptionSchema = yup.object().shape({
  deliveryPlan: yup.string().required("배송주기는 필수입니다."),
  mealPlan: yup.string().required("식사량은 필수입니다."),
  paymentExpectedPrice: yup
    .number()
    .required("paymentExpectedPrice는 필수입니다."),
  totalOriginalPrice: yup.number().required("totalOriginPrice는 필수입니다."),
  rawFoods: yup
    .array()
    .of(
      yup.object({
        recipeId: yup.number().required("레시피 ID는 필수입니다."),
        oneMealGramsPerRecipe: yup
          .number()
          .min(20, "최소 20g 이상이어야 합니다.")
          .max(500, "최대 500g 이하이어야 합니다.")
          .required("급여량은 필수입니다."),
        packPrice: yup.number(),
        originalPrice: yup.number(),
        discountedPrice: yup.number(),
      })
    )
    .min(1, "레시피를 선택해주세요.")
    .required(),
});

export type SubscriptionValues = yup.InferType<typeof subscriptionSchema>;
export type SubscriptionKeys = keyof SubscriptionValues;

export const defaultSubscriptionValues: SubscriptionValues = {
  mealPlan: "TWO_MEAL",
  deliveryPlan: "TWO_WEEK",
  paymentExpectedPrice: 0,
  totalOriginalPrice: 0,
  rawFoods: [],
};
