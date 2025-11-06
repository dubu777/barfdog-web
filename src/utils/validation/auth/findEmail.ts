import * as yup from "yup";

export const findUserEmailSchema = yup.object().shape({
  memberName: yup
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .required("이름은 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
});

export type FindEmailValues = yup.InferType<typeof findUserEmailSchema>;

export const defaultFindUserEmailValues: FindEmailValues = {
  memberName: "",
  phoneNumber: "",
};
