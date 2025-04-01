import * as yup from "yup";

export interface OrderFormValues {
  appliedReward: number;
}


export const getOrderSchema = (maxAvailableReward: number) =>
  yup.object({
    appliedReward: yup
      .number()
      .typeError("숫자만 입력 가능합니다.")
      .required("적립금을 입력해주세요.")
      .min(0, "0 이상이어야 합니다.")
      .max(
        maxAvailableReward,
        `최대 ${maxAvailableReward.toLocaleString()}까지만 사용 가능합니다.`
      ),
  });


export const defaultOrderValues: OrderFormValues = {
  appliedReward: 0,
};