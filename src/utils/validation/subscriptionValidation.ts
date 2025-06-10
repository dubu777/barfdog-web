import * as yup from "yup";

export const subscriptionSchema = yup.object().shape({
  mealFrequency: yup.number().required("식사량은 필수입니다."),
  deliveryCycle: yup.number().required("배송주기는 필수입니다."),
  originPrice: yup.number().required("originPrice는 필수입니다."), 
  finalPrice: yup.number().required("finalPrice는 필수입니다."),
  recipeList: yup
    .array()
    .of(
      yup.object({
        recipeId: yup.number().required("레시피 ID는 필수입니다."),
        packGrams: yup
        .number()
        .min(20, "최소 20g 이상이어야 합니다.")
        .max(500, "최대 500g 이하이어야 합니다.")
        .required("급여량은 필수입니다."),
        packPrice: yup.number(),
        originPrice: yup.number(),
        salePrice: yup.number(),
      })
    )
    .min(1, "레시피를 선택해주세요.")
    .required(),
    generalItemList: yup
    .array()
    .of(
      yup.object({
        itemId: yup.number().required("상품 ID는 필수입니다."),
        amount: yup.number().required("상품 수량은 필수입니다."),
        originPrice: yup.number().required("상품 금액은 필수입니다."),
      })
    ),
});

export type SubscriptionValues = yup.InferType<typeof subscriptionSchema>;
export type SubscriptionKeys = keyof SubscriptionValues;

export const defaultSubscriptionValues: SubscriptionValues = {
  mealFrequency: 2,
  deliveryCycle: 2,
  originPrice: 0,
  finalPrice: 0,
  recipeList: [],
  generalItemList: [],
}
