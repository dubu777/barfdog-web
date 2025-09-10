import * as yup from "yup";

// 휴대폰 인증 번호 요청
export const requestResetCodeSchema = yup.object().shape({
  name: yup.string().required("이름은 필수입니다."),
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
});

export type RequestResetCodeValues = yup.InferType<
  typeof requestResetCodeSchema
>;

export const defaultRequestResetCodeValues: RequestResetCodeValues = {
  email: "",
  name: "",
  phoneNumber: "",
};

// 비밀번호 리셋
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
      "문자·숫자·특수문자를 각각 하나 이상 포함해야 합니다."
    )
    .test(
      "no-repeat-seq",
      "3회 이상 동일하거나 연속성이 있는 문자 사용을 금지합니다.",
      (value = "") => {
        for (let i = 0; i < value.length - 2; i++) {
          const a = value.charCodeAt(i),
            b = value.charCodeAt(i + 1),
            c = value.charCodeAt(i + 2);
          if (a === b && b === c) return false;
          if (b - a === 1 && c - b === 1) return false;
          if (a - b === 1 && b - c === 1) return false;
        }
        return true;
      }
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수입니다."),
});

export type ResetPasswordValues = yup.InferType<typeof resetPasswordSchema>;

export const defaultResetPasswordValues: ResetPasswordValues = {
  password: "",
  confirmPassword: "",
};
