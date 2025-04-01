import * as yup from 'yup';

export const couponSchema = yup.object().shape({
  code: yup.string().max(20, "20자 이하 입력 가능합니다."),
});

export const couponDefaultValues = {
  code: "",
};