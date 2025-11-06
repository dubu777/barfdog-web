import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  password: yup.string().required("비밀번호는 필수입니다."),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const defaultLoginValues = (initialUserEmail: string | null) => {
  return {
    email: initialUserEmail || "",
    password: "",
  };
};
