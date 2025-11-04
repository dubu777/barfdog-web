import { DELIVERY_PLAN, MEAL_PLAN } from "@/constants";
import { DeliveryPlan, MealPlan, SubscriptionValues } from "@/types";
import { is } from "date-fns/locale";
import * as yup from "yup";

export const subscriptionSchema: yup.ObjectSchema<SubscriptionValues> = yup
  .object()
  .shape({
    deliveryPlan: yup
      .mixed<DeliveryPlan>()
      .oneOf([...DELIVERY_PLAN], "배송주기를 선택해주세요")
      .required("배송주기를 선택해주세요"),
    mealPlan: yup
      .mixed<MealPlan>()
      .oneOf([...MEAL_PLAN], "식사 횟수를 선택해주세요")
      .required("식사 횟수를 선택해주세요"),
    recipeList: yup
      .array()
      .of(
        yup.object({
          recipeId: yup.number().required("레시피 ID는 필수입니다"),
          packGrams: yup
            .number()
            .min(20, "최소 20g 이상이어야 합니다.")
            .max(500, "최대 500g 이하이어야 합니다.")
            .required("급여량은 필수입니다."),
          packPrice: yup.number().required("팩 가격은 필수입니다."),
        })
      )
      .min(1, "레시피를 선택해주세요.")
      .required(),
    isAgreeSubscription: yup
      .boolean()
      .oneOf([true], "구독 약관에 동의하셔야 합니다.")
      .required("구독 약관에 동의하셔야 합니다."),
  });

export const BASE_DEFAULT_SUBSCRIPTION_VALUES: SubscriptionValues = {
  mealPlan: 2 as MealPlan,
  deliveryPlan: 2 as DeliveryPlan,
  recipeList: [],
  isAgreeSubscription: false,
};

export function defaultSubscriptionValues(
  initial?: Partial<SubscriptionValues>
): SubscriptionValues {
  return {
    ...BASE_DEFAULT_SUBSCRIPTION_VALUES,
    ...initial,
    recipeList:
      initial?.recipeList ?? BASE_DEFAULT_SUBSCRIPTION_VALUES.recipeList,
  };
}
